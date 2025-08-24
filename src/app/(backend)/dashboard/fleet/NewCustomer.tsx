"use client";
import { X, Upload, Trash2 } from "lucide-react";
import React, { useRef, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { createFleet } from "@/lib/actions";

function Dailogbox({ onDailog }: { onDailog: Function }) {
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    licensePlate: "",
    vin: "",
    vehicleType: "Sedan",
    category: "Premium",
    seats: 4,
    doors: 4,
    transmission: "Automatic",
    fuelType: "Petrol",
    features: [] as string[],
    luggageCapacity: 2,
    basePricePerHour: 0,
    pricePerKm: 0,
    minimumBookingHours: 1,
    description: "",
    addedBy: "",
    // Remove the images field - it's handled separately
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const vehicleTypes = [
    "Sedan",
    "SUV",
    "Limousine",
    "Van",
    "Convertible",
    "Coupe",
  ];
  const categories = ["Premium", "Business", "Elite", "Luxury", "VIP"];
  const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
  const availableFeatures = [
    "WiFi",
    "TV",
    "MiniBar",
    "Sunroof",
    "MassageSeats",
    "PrivacyPartition",
    "ClimateControl",
    "ChargingPorts",
    "AirPurifier",
    "LeatherSeats",
  ];

  // Image validation function
  const validateImage = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload only JPEG, PNG, or WebP images");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("Image size must be less than 5MB");
      return false;
    }

    return true;
  };

  // Handle file selection
  const handleFileSelect = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const validFiles: File[] = [];

      fileArray.forEach((file) => {
        if (validateImage(file)) {
          validFiles.push(file);
        }
      });

      if (imageFiles.length + validFiles.length > 10) {
        toast.error("Maximum 10 images allowed");
        return;
      }

      if (imageFiles.length + validFiles.length < 3 && validFiles.length > 0) {
        toast.warning("Minimum 3 images required");
      }

      // Update files and create previews
      const newFiles = [...imageFiles, ...validFiles];
      setImageFiles(newFiles);

      // Create preview URLs
      const newPreviews = [...imagePreviews];
      validFiles.forEach((file) => {
        const previewUrl = URL.createObjectURL(file);
        newPreviews.push(previewUrl);
      });
      setImagePreviews(newPreviews);
    },
    [imageFiles, imagePreviews]
  );

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files);
      }
    },
    [handleFileSelect]
  );

  // Remove image
  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index]);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  // Upload images to server (you'll need to implement this based on your backend)
  const uploadImages = async (files: File[]): Promise<string[]> => {
    // This is a placeholder - implement actual image upload logic
    // You might want to upload to a cloud service or your server
    const uploadPromises = files.map(async (file, index) => {
      // Simulate upload - replace with actual upload logic
      return `/FleetsImages/${Date.now()}_${index}_${file.name}`;
    });

    return Promise.all(uploadPromises);
  };

  const handleformSubmit = async (e: any) => {
    e.preventDefault();

    // Validate minimum images
    if (imageFiles.length < 3) {
      toast.error("Please upload at least 3 images");
      return;
    }

    setIsLoading(true);

    try {
      // Upload images first
      const imageUrls = await uploadImages(imageFiles);

      const currentUserId = "675a123456789012345678ab";

      // Fix: Create proper image objects array according to the fleet model
      const imageObjects = imageUrls.map((url, index) => ({
        url: url,
        isThumbnail: index === 0 // Set first image as thumbnail
      }));

      const fleetData = {
        ...form,
        addedBy: currentUserId,
        images: imageObjects, // Use the properly formatted image objects array
      };

      const result = await createFleet(fleetData);

      if (result.success) {
        toast.success("Fleet created successfully!");
        // Clean up preview URLs
        imagePreviews.forEach((url) => URL.revokeObjectURL(url));
        onDailog(true);
      } else {
        toast.error(`Failed to create fleet: ${result.error}`);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f: string) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add New Fleet Vehicle</h2>
          <button
            onClick={() => onDailog(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleformSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Make
              </label>
              <input
                type="text"
                value={form.make}
                onChange={(e) => setForm({ ...form, make: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <input
                type="text"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="number"
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: parseInt(e.target.value) })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                License Plate
              </label>
              <input
                type="text"
                value={form.licensePlate}
                onChange={(e) =>
                  setForm({ ...form, licensePlate: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                VIN
              </label>
              <input
                type="text"
                value={form.vin}
                onChange={(e) => setForm({ ...form, vin: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Type
              </label>
              <select
                value={form.vehicleType}
                onChange={(e) =>
                  setForm({ ...form, vehicleType: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <select
                value={form.fuelType}
                onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                {fuelTypes.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Seats
              </label>
              <input
                type="number"
                value={form.seats}
                onChange={(e) =>
                  setForm({ ...form, seats: parseInt(e.target.value) })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                min="2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Doors
              </label>
              <input
                type="number"
                value={form.doors}
                onChange={(e) =>
                  setForm({ ...form, doors: parseInt(e.target.value) })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                min="2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Luggage Capacity
              </label>
              <input
                type="number"
                value={form.luggageCapacity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    luggageCapacity: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Base Price per Hour ($)
              </label>
              <input
                type="number"
                value={form.basePricePerHour}
                onChange={(e) =>
                  setForm({
                    ...form,
                    basePricePerHour: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price per KM ($)
              </label>
              <input
                type="number"
                value={form.pricePerKm}
                onChange={(e) =>
                  setForm({ ...form, pricePerKm: parseFloat(e.target.value) })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minimum Booking Hours
              </label>
              <input
                type="number"
                value={form.minimumBookingHours}
                onChange={(e) =>
                  setForm({
                    ...form,
                    minimumBookingHours: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                min="1"
                required
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableFeatures.map((feature) => (
                <label key={feature} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="rounded"
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Images (3-10 images required)
            </label>

            {/* Drag and Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragOver
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop images here, or click to select files
              </p>
              <p className="text-xs text-gray-500">
                JPEG, PNG, WebP up to 5MB each. {imageFiles.length}/10 images
                selected
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={(e) =>
                  e.target.files && handleFileSelect(e.target.files)
                }
                className="hidden"
              />
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Image Previews:
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                          Thumbnail
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows={3}
              maxLength={500}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => onDailog(true)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || imageFiles.length < 3}
              className="px-4 py-2 bg-primary-main text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Fleet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dailogbox;
