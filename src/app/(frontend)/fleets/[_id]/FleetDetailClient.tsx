"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Autoplay } from "swiper/modules";
import {
  ArrowLeft,
  Users,
  DoorOpen,
  Car,
  Fuel,
  Settings,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface Fleet {
  _id: string;
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
  available: boolean;
  images: Array<{ url: string; isThumbnail: boolean }>;
  addedBy: { username: string; email: string };
  description?: string;
  rating?: number;
  createdAt: string;
  lastUpdated: string;
}

interface FleetDetailClientProps {
  fleet: Fleet;
}

export default function FleetDetailClient({ fleet }: FleetDetailClientProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const featureIcons: { [key: string]: React.ReactNode } = {
    WiFi: "📶",
    TV: "📺",
    MiniBar: "🍷",
    Sunroof: "🌞",
    MassageSeats: "💆",
    PrivacyPartition: "🚗",
    ClimateControl: "❄️",
    ChargingPorts: "🔌",
    AirPurifier: "🌬️",
    LeatherSeats: "🪑",
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-white to-primary-dark">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <Link
            href="/fleets"
            className="inline-flex items-center text-primary-main hover:text-primary-lite transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Fleet
          </Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div
          className={`text-center mb-12 transition-all duration-1000 transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                fleet.available
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {fleet.available ? "Available" : "Not Available"}
            </span>
            <span className="ml-3 px-3 py-1 bg-primary-golden text-primary-lite rounded-full text-sm font-bold">
              {fleet.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-Saira font-extrabold text-primary-main mb-4">
            {fleet.make} {fleet.model}
          </h1>

          <p className="text-xl text-gray-600 mb-2">
            {fleet.year} • {fleet.vehicleType} • {fleet.category} Class
          </p>

          {fleet.rating && (
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < fleet.rating!
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">({fleet.rating}/5)</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              mounted ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            {/* Main Image Slider */}
            <div className="mb-4 rounded-2xl overflow-hidden shadow-2xl">
              <Swiper
                modules={[Navigation, Pagination, Thumbs, Autoplay]}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={fleet.images.length > 1}
                className="aspect-[4/3] bg-gray-100"
                onSlideChange={(swiper) =>
                  setActiveImageIndex(swiper.realIndex)
                }
              >
                {fleet.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <Image
                        src={image.url}
                        alt={`${fleet.make} ${fleet.model} - Image ${
                          index + 1
                        }`}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {image.isThumbnail && (
                        <div className="absolute top-4 left-4 bg-primary-golden text-primary-lite px-2 py-1 rounded text-xs font-bold">
                          Main
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}

                {/* Custom Navigation Buttons */}
                <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary-main rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary-main rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110">
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </button>
              </Swiper>
            </div>

            {/* Thumbnail Slider */}
            {fleet.images.length > 1 && (
              <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                breakpoints={{
                  640: { slidesPerView: 5 },
                  768: { slidesPerView: 6 },
                }}
                watchSlidesProgress
                className="thumbs-swiper"
              >
                {fleet.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                        index === activeImageIndex
                          ? "ring-2 ring-primary-main ring-offset-2"
                          : "hover:ring-2 hover:ring-primary-main/50 hover:ring-offset-1"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`${fleet.make} ${fleet.model} - Thumbnail ${
                          index + 1
                        }`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 12vw"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Fleet Details */}
          <div
            className={`transition-all duration-1000 delay-500 transform ${
              mounted ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary-main mb-4">
                Pricing
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Base Rate (per hour)</span>
                  <span className="text-2xl font-bold text-primary-main">
                    {formatPrice(fleet.basePricePerHour)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Per Kilometer</span>
                  <span className="text-lg font-semibold">
                    {formatPrice(fleet.pricePerKm)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Minimum Booking</span>
                  <span className="text-lg font-semibold">
                    {fleet.minimumBookingHours}{" "}
                    {fleet.minimumBookingHours === 1 ? "hour" : "hours"}
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 bg-primary-main hover:bg-primary-lite text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Book Now
              </button>
            </div>

            {/* Vehicle Specifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary-main mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary-main" />
                  <div>
                    <p className="text-sm text-gray-600">Passengers</p>
                    <p className="font-semibold">{fleet.seats} seats</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <DoorOpen className="h-5 w-5 text-primary-main" />
                  <div>
                    <p className="text-sm text-gray-600">Doors</p>
                    <p className="font-semibold">{fleet.doors} doors</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-primary-main" />
                  <div>
                    <p className="text-sm text-gray-600">Transmission</p>
                    <p className="font-semibold">{fleet.transmission}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Fuel className="h-5 w-5 text-primary-main" />
                  <div>
                    <p className="text-sm text-gray-600">Fuel Type</p>
                    <p className="font-semibold">{fleet.fuelType}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Car className="h-5 w-5 text-primary-main" />
                  <div>
                    <p className="text-sm text-gray-600">Luggage</p>
                    <p className="font-semibold">
                      {fleet.luggageCapacity} bags
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary-main" />
                  <div>
                    <p className="text-sm text-gray-600">Year</p>
                    <p className="font-semibold">{fleet.year}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary-main mb-4">
                Vehicle Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">License Plate:</span>
                  <span className="font-mono font-semibold">
                    {fleet.licensePlate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Added:</span>
                  <span>{formatDate(fleet.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span>{formatDate(fleet.lastUpdated)}</span>
                </div>
                {fleet.addedBy && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Added by:</span>
                    <span>{fleet.addedBy.username}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-full mt-6 flex flex-row transform transition-all duration-1000 delay-300
    ${mounted ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}
  `}
        >
          {/* Features Section - Takes half width */}
          {fleet.features?.length > 0 && (
            <div className="w-1/2 bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary-main mb-4">
                Features & Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fleet.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg">
                      {featureIcons[feature] || "✨"}
                    </span>
                    <span className="font-medium">{feature}</span>
                    <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description Section - Takes remaining space */}
          {fleet.description && (
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 ml-4">
              <h3 className="text-2xl font-bold text-primary-main mb-4">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {fleet.description}
              </p>
            </div>
          )}
        </div>
        {/* Contact Section */}
        <div
          className={`mt-12 bg-gradient-to-r from-primary-main to-primary-lite rounded-2xl p-8 text-white text-center transition-all duration-1000 delay-700 transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Book This Vehicle?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Contact our luxury chauffeur service team to make a reservation or
            get more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-main font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-primary-golden text-primary-lite font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105">
              <Mail className="h-5 w-5 mr-2" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
