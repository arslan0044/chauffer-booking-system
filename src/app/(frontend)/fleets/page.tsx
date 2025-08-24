"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import CarCard from "@/components/CarCard";
import { getFleets } from "@/lib/actions";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import LoadingPage from "@/components/LoadingPage";

interface Fleet {
  _id: string;
  make: string;
  model: string;
  vehicleType: string;
  category: string;
  seats: number;
  doors: number;
  basePricePerHour: number;
  images: Array<{ url: string; isThumbnail: boolean }>;
  available: boolean;
  fuelType: string;
  transmission: string;
  features: string[];
}

interface Filters {
  category: string;
  vehicleType: string;
  fuelType: string;
  transmission: string;
  minPrice: string;
  maxPrice: string;
  minSeats: string;
  maxSeats: string;
}

function FleetPage() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    category: "",
    vehicleType: "",
    fuelType: "",
    transmission: "",
    minPrice: "",
    maxPrice: "",
    minSeats: "",
    maxSeats: "",
  });

  // Filter options based on fleet model schema
  const filterOptions = {
    categories: ["Premium", "Business", "Elite", "Luxury", "VIP"],
    vehicleTypes: ["Sedan", "SUV", "Limousine", "Van", "Convertible", "Coupe"],
    fuelTypes: ["Petrol", "Diesel", "Hybrid", "Electric"],
    transmissions: ["Automatic", "Manual"],
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string, currentFilters: Filters) => {
      fetchFleets(term, currentFilters);
    }, 300),
    []
  );

  // Fetch fleets with search and filters
  const fetchFleets = async (
    search: string = "",
    currentFilters: Filters = filters
  ) => {
    try {
      setIsSearching(true);

      const options: any = {
        search: search.trim() || undefined,
        filters: {
          available: true,
          ...(currentFilters.category && { category: currentFilters.category }),
          ...(currentFilters.vehicleType && {
            vehicleType: currentFilters.vehicleType,
          }),
          ...(currentFilters.fuelType && { fuelType: currentFilters.fuelType }),
          ...(currentFilters.transmission && {
            transmission: currentFilters.transmission,
          }),
          ...(currentFilters.minPrice && {
            minPrice: parseFloat(currentFilters.minPrice),
          }),
          ...(currentFilters.maxPrice && {
            maxPrice: parseFloat(currentFilters.maxPrice),
          }),
          ...(currentFilters.minSeats && {
            minSeats: parseInt(currentFilters.minSeats),
          }),
          ...(currentFilters.maxSeats && {
            maxSeats: parseInt(currentFilters.maxSeats),
          }),
        },
        sort: [{ field: "createdAt", order: "desc" as const }],
      };

      const fleetsData = await getFleets(options);
      setFleets(fleetsData);
      setError(null);
    } catch (err) {
      setError("Error loading fleets");
      console.error("Error fetching fleets:", err);
    } finally {
      setIsSearching(false);
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchFleets();
  }, []);

  // Handle search input changes
  useEffect(() => {
    if (!isLoading) {
      debouncedSearch(searchTerm, filters);
    }
  }, [searchTerm, debouncedSearch, isLoading]);

  // Handle filter changes
  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (!isLoading) {
      fetchFleets(searchTerm, newFilters);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = {
      category: "",
      vehicleType: "",
      fuelType: "",
      transmission: "",
      minPrice: "",
      maxPrice: "",
      minSeats: "",
      maxSeats: "",
    };
    setFilters(clearedFilters);
    setSearchTerm("");
    fetchFleets("", clearedFilters);
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      Object.values(filters).some((value) => value !== "") || searchTerm !== ""
    );
  }, [filters, searchTerm]);

  // Transform fleet data for CarCard component
  const transformFleetData = (fleet: Fleet) => {
    const thumbnailImage = fleet.images?.find((img) => img.isThumbnail);
    const firstImage = fleet.images?.[0];
    const imageUrl =
      thumbnailImage?.url || firstImage?.url || "/api/placeholder/400/300";

    return {
      _id: fleet._id,
      Doors: fleet.doors,
      Type: fleet.vehicleType,
      Seats: fleet.seats,
      StritingPrice: fleet.basePricePerHour,
      Model: `${fleet.make} ${fleet.model}`,
      CardImg: imageUrl,
    };
  };

  if (isLoading) {
    return (
      <LoadingPage variant="progress" message="Loading Fleet" progress={65} />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchFleets()}
            className="px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-lite transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto my-12 max-w-screen-xl px-4">
      {/* Header Section */}
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <span className="text-2xl font-bold font-Saira rounded-full text-primary-lite px-4 py-1.5 mr-3">
          Get the Best Offers
        </span>
        <h2 className="mb-4 text-4xl md:text-7xl tracking-tight font-Saira font-extrabold text-primary-main dark:text-primary-lite">
          Our Featured Fleets.
        </h2>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by make, model, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-all duration-200"
          />
          {isSearching && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-main"></div>
            </div>
          )}
        </div>

        {/* Filter Toggle Button */}
        <div className="text-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main transition-all duration-200"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown
              className={`h-4 w-4 ml-2 transform transition-transform duration-200 ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-2 inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </button>
          )}
        </div>

        {/* Filter Panel */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-all duration-200"
                >
                  <option value="">All Categories</option>
                  {filterOptions.categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  value={filters.vehicleType}
                  onChange={(e) =>
                    handleFilterChange("vehicleType", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-all duration-200"
                >
                  <option value="">All Types</option>
                  {filterOptions.vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fuel Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  value={filters.fuelType}
                  onChange={(e) =>
                    handleFilterChange("fuelType", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-all duration-200"
                >
                  <option value="">All Fuel Types</option>
                  {filterOptions.fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission
                </label>
                <select
                  value={filters.transmission}
                  onChange={(e) =>
                    handleFilterChange("transmission", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-all duration-200"
                >
                  <option value="">All Transmissions</option>
                  {filterOptions.transmissions.map((trans) => (
                    <option key={trans} value={trans}>
                      {trans}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price and Seats Range Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price Range */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price ($/hr)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange("minPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price ($/hr)
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange("maxPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-all duration-200"
                  />
                </div>
              </div>

              {/* Seats Range */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Seats
                  </label>
                  <input
                    type="number"
                    placeholder="2"
                    value={filters.minSeats}
                    onChange={(e) =>
                      handleFilterChange("minSeats", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Seats
                  </label>
                  <input
                    type="number"
                    placeholder="8"
                    value={filters.maxSeats}
                    onChange={(e) =>
                      handleFilterChange("maxSeats", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          {isSearching
            ? "Searching..."
            : `Showing ${fleets.length} ${
                fleets.length === 1 ? "vehicle" : "vehicles"
              }${hasActiveFilters ? " matching your criteria" : ""}`}
        </p>
      </div>

      {/* Fleet Grid */}
      {fleets.length === 0 && !isSearching ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <Search className="h-16 w-16 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No vehicles found
            </h3>
            <p className="text-gray-500 mb-4">
              {hasActiveFilters
                ? "Try adjusting your search criteria or filters to find more vehicles."
                : "No vehicles are currently available."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-main hover:bg-primary-lite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main transition-all duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {fleets.map((fleet, index) => {
            const cardData = transformFleetData(fleet);
            return (
              <div
                key={fleet._id}
                className={`transform transition-all duration-500 hover:scale-105 ${
                  isSearching ? "opacity-50" : "opacity-100"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isSearching
                    ? "none"
                    : "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <CarCard
                  _id={cardData._id}
                  Doors={cardData.Doors}
                  Type={cardData.Type}
                  Seats={cardData.Seats}
                  StritingPrice={cardData.StritingPrice}
                  Model={cardData.Model}
                  CardImg={cardData.CardImg}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default FleetPage;
