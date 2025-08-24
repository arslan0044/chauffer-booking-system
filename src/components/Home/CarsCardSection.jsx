"use client";
import React, { useState, useEffect } from "react";
import CarCard from "../CarCard";
import Link from "next/link";
import { getFleets } from "@/lib/actions";

function CarsCard() {
  const [featuredFleets, setFeaturedFleets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedFleets = async () => {
      try {
        setIsLoading(true);
        // Fetch exactly 3 fleet records, sorted by creation date (newest first)
        const fleets = await getFleets({
          pagination: { page: 1, limit: 3 },
          sort: [{ field: "createdAt", order: "desc" }],
          fields: [
            "make",
            "model",
            "vehicleType",
            "doors",
            "seats",
            "basePricePerHour",
            "images",
            "available",
          ],
          filters: { available: true },
        });
        console.log(fleets);
        // Transform the data to match CarCard props
        const transformedFleets = fleets.data.map((fleet) => ({
          _id: fleet._id,
          Doors: fleet.doors,
          Type: fleet.vehicleType,
          Seats: fleet.seats,
          StritingPrice: fleet.basePricePerHour,
          Model: `${fleet.make} ${fleet.model}`,
          CardImg:
            fleet.images &&
            Array.isArray(fleet.images) &&
            fleet.images.length > 0
              ? fleet.images.find((img) => img && img.isThumbnail === true)
                  ?.url ||
                fleet.images[0]?.url ||
                "https://via.placeholder.com/400x300?text=No+Image"
              : "https://via.placeholder.com/400x300?text=No+Image",
        }));
        console.log(transformedFleets);
        setFeaturedFleets(transformedFleets);
      } catch (error) {
        console.error("Error fetching featured fleets:", error);
        // Fallback to empty array on error
        setFeaturedFleets([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedFleets();
  }, []);

  if (isLoading) {
    return (
      <section className="mx-auto my-12 max-w-screen-xl">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <span className="text-2xl font-bold font-Saira rounded-full text-lite px-4 py-1.5 mr-3">
            Get the Best Offers
          </span>
          <h2 className="mb-4 text-7xl tracking-tight font-Saira font-extrabold text-primary-main dark:text-primary-lite">
            Our Featured Cars.
          </h2>
        </div>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-72 rounded-t-3xl"></div>
              <div className="bg-gray-100 p-10">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto my-12 max-w-screen-xl">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <span className="text-2xl font-bold font-Saira rounded-full text-lite px-4 py-1.5 mr-3">
          Get the Best Offers
        </span>
        <h2 className="mb-4 text-7xl tracking-tight font-Saira font-extrabold text-primary-main dark:text-primary-lite">
          Our Featured Cars.
        </h2>
      </div>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {featuredFleets.length > 0 ? (
          featuredFleets.map((fleet, index) => (
            <CarCard
              _id={fleet._id}
              key={index}
              Doors={fleet.Doors}
              Type={fleet.Type}
              Seats={fleet.Seats}
              StritingPrice={fleet.StritingPrice}
              Model={fleet.Model}
              CardImg={fleet.CardImg}
            />
          ))
        ) : (
          // Fallback content if no fleets are available
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              No featured vehicles available at the moment.
            </p>
          </div>
        )}
      </div>
      <div className="grid place-items-center mt-5">
        <Link
          className="bg-primary-golden hover:bg-primary-main rounded-full px-10 py-3 hover:text-white duration-300"
          href={"/fleets"}
        >
          VIEW ALL CAR
        </Link>
      </div>
    </section>
  );
}

export default CarsCard;
