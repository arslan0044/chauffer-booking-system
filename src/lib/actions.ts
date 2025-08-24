"use server";

import { connect } from "@/dbConfig/dbConfig";
import Fleet from "@/models/fleetModel";
import Gallery from "@/models/galleryModel";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

connect();

export async function getFleets(options: {
  search?: string;
  filters?: {
    category?: string;
    vehicleType?: string;
    available?: boolean;
    make?: string;
    fuelType?: string;
    transmission?: string;
    minPrice?: number;
    maxPrice?: number;
    minSeats?: number;
    maxSeats?: number;
    features?: string[];
    dateFrom?: Date;
    dateTo?: Date;
  };
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  }[];
  pagination?: {
    page: number;
    limit: number;
  };
  fields?: string[];
} = {}) {
  try {
    // Build the base query
    let query: any = {};
    
    // Default filter for available vehicles (maintain backward compatibility)
    if (options.filters?.available !== undefined) {
      query.available = options.filters.available;
    } else {
      query.available = true; // Default behavior
    }

    // Apply filters
    if (options.filters) {
      const { 
        category, 
        vehicleType, 
        make, 
        fuelType, 
        transmission, 
        minPrice, 
        maxPrice, 
        minSeats, 
        maxSeats, 
        features,
        dateFrom,
        dateTo
      } = options.filters;

      if (category) query.category = category;
      if (vehicleType) query.vehicleType = vehicleType;
      if (make) query.make = new RegExp(make, 'i');
      if (fuelType) query.fuelType = fuelType;
      if (transmission) query.transmission = transmission;
      
      // Price range filtering
      if (minPrice !== undefined || maxPrice !== undefined) {
        query.basePricePerHour = {};
        if (minPrice !== undefined) query.basePricePerHour.$gte = minPrice;
        if (maxPrice !== undefined) query.basePricePerHour.$lte = maxPrice;
      }
      
      // Seats range filtering
      if (minSeats !== undefined || maxSeats !== undefined) {
        query.seats = {};
        if (minSeats !== undefined) query.seats.$gte = minSeats;
        if (maxSeats !== undefined) query.seats.$lte = maxSeats;
      }
      
      // Features filtering (vehicle must have all specified features)
      if (features && features.length > 0) {
        query.features = { $all: features };
      }
      
      // Date range filtering (for createdAt)
      if (dateFrom || dateTo) {
        query.createdAt = {};
        if (dateFrom) query.createdAt.$gte = dateFrom;
        if (dateTo) query.createdAt.$lte = dateTo;
      }
    }

    // Apply search across multiple fields
    if (options.search) {
      const searchRegex = new RegExp(options.search, 'i');
      query.$or = [
        { make: searchRegex },
        { model: searchRegex },
        { licensePlate: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { vehicleType: searchRegex }
      ];
    }

    // Build the MongoDB query
    let mongoQuery = Fleet.find(query);

    // Apply field selection for performance
    if (options.fields && options.fields.length > 0) {
      const fieldSelection = options.fields.join(' ');
      mongoQuery = mongoQuery.select(fieldSelection);
    }

    // Apply population (maintain existing behavior)
    mongoQuery = mongoQuery
      // .populate('images.image')
      .populate('addedBy', "username");

    // Apply sorting
    if (options.sort && options.sort.length > 0) {
      const sortObj: any = {};
      options.sort.forEach(({ field, order }) => {
        // Validate sort fields to prevent injection
        const allowedSortFields = [
          'make', 'model', 'year', 'category', 'vehicleType', 
          'basePricePerHour', 'pricePerKm', 'seats', 'doors',
          'createdAt', 'lastUpdated', 'rating'
        ];
        
        if (allowedSortFields.includes(field)) {
          sortObj[field] = order === 'desc' ? -1 : 1;
        }
      });
      
      if (Object.keys(sortObj).length > 0) {
        mongoQuery = mongoQuery.sort(sortObj);
      }
    } else {
      // Default sorting by creation date (newest first)
      mongoQuery = mongoQuery.sort({ createdAt: -1 });
    }

    // Apply pagination
    if (options.pagination) {
      const { page = 1, limit = 10 } = options.pagination;
      
      // Validate pagination parameters
      const validatedPage = Math.max(1, Math.floor(page));
      const validatedLimit = Math.min(100, Math.max(1, Math.floor(limit))); // Max 100 items per page
      
      const skip = (validatedPage - 1) * validatedLimit;
      mongoQuery = mongoQuery.skip(skip).limit(validatedLimit);
    }

    // Execute query
    const fleets = await mongoQuery.lean();
    
    // Get total count for pagination (only if pagination is requested)
    let totalCount = null;
    if (options.pagination) {
      totalCount = await Fleet.countDocuments(query);
    }

    // Prepare response
    const result = {
      data: JSON.parse(JSON.stringify(fleets)),
      ...(options.pagination && {
        pagination: {
          page: options.pagination.page || 1,
          limit: options.pagination.limit || 10,
          total: totalCount,
          pages: Math.ceil(totalCount! / (options.pagination.limit || 10))
        }
      })
    };

    // Return data directly for backward compatibility when no pagination
    return options.pagination ? result : result.data;
    
  } catch (error) {
    console.error("Error fetching fleets:", error);
    return options.pagination ? { data: [], pagination: null } : [];
  }
}

export async function getGallery() {
  try {
    const gallery = await Gallery.find({ isDeleted: false })
      .sort({ uploadedAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(gallery));
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
}

export async function deleteFleet(id: string) {
  try {
    await Fleet.findByIdAndDelete(id);
    return { success: true };
  } catch (error: any) {
    if (error.name === "CastError") {
      return { success: false, error: "Invalid fleet ID" };
    }
    console.error("Error deleting fleet:", error);
    return { success: false, error: error.message };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, error: "User does not exist" };
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return { success: false, error: "Invalid password" };
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // Set cookie
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return { success: true, message: "Login successful" };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
}

export async function getFleetById(id: string) {
  try {
    const fleet = await Fleet.findById(id)
      // .populate('images.image')
      .populate('addedBy', 'username email')
      .lean();
    if (!fleet) {
      return { success: false, error: "Fleet not found" };
    }
    return { success: true, data: JSON.parse(JSON.stringify(fleet)) };
  } catch (error: any) {
    if (error.name === "CastError") {
      return { success: false, error: "Invalid fleet ID" };
    }
    console.error("Error fetching fleet:", error);
    return { success: false, error: error.message };
  }
}

export async function createFleet(fleetData: {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  vehicleType: string;
  category: string;
  seats: number;
  doors: number;
  transmission: string;
  fuelType: string;
  features: string[];
  luggageCapacity: number;
  basePricePerHour: number;
  pricePerKm: number;
  minimumBookingHours: number;
  description?: string;
  addedBy: string;
}) {
  try {
    const newFleet = new Fleet(fleetData);
    const savedFleet = await newFleet.save();
    return {
      success: true,
      message: "Fleet created successfully",
      data: JSON.parse(JSON.stringify(savedFleet)),
    };
  } catch (error: any) {
    console.error("Error creating fleet:", error);
    return { success: false, error: error.message };
  }
}

export async function updateFleet(id: string, updateData: any) {
  try {
    const fleet = await Fleet.findById(id);
    if (!fleet) {
      return { success: false, error: "Fleet not found" };
    }

    const updatedFleet = await Fleet.findByIdAndUpdate(id, {
      ...updateData,
      lastUpdated: new Date()
    }, {
      new: true,
    }).lean();

    return {
      success: true,
      message: "Fleet updated successfully",
      data: JSON.parse(JSON.stringify(updatedFleet)),
    };
  } catch (error: any) {
    if (error.name === "CastError") {
      return { success: false, error: "Invalid fleet ID" };
    }
    console.error("Error updating fleet:", error);
    return { success: false, error: error.message };
  }
}