"use client";
import React from "react";
import CarCard from "../CarCard";
import { useState, useEffect } from "react";
import { getFleets } from "@/lib/actions";

function FleetPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const fleetsData = await getFleets();
        setData(fleetsData);
      } catch (err) {
        setError(err);
        console.error("Error fetching fleets:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) return <div>Loading fleets...</div>;
  if (error) return <div>Error loading fleets</div>;

  const fleetsData = data;
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
        {fleetsData.map((car) => (
          <div className="my-8" key={car._id}>
            <CarCard
              Doors={car.doors}
              Type={car.type}
              Seats={car.seats}
              StritingPrice={car.price}
              Model={car.model}
              CardImg={car.img}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FleetPage;
