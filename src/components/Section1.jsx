import { Done, TimeToLeave } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
function Section1() {
  const ServiceList = [
    "Frequent Inspections",
    "24/7 Customer Support",
    "Best Pricing Policy",
    "GPS Vehicles",
    "Low Deposits",
    "Well Maintained Vehicles",
  ];
  return (
    <section className=" my-14 dark:bg-gray-900">
      <div className="grid max-w-screen-2xl bg-slate-100 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="hidden w-full h-full lg:mt-0 lg:col-span-6 lg:flex">
          <img
            src="https://img.freepik.com/free-photo/businesswoman-getting-taxi-cab_23-2149236685.jpg"
            alt="mockup"
            className="h-full w-full"
          />
        </div>
        <div className="px-12 place-self-center py-20 lg:col-span-6">
          <h1 className=" mb-4 text-3xl font-bold tracking-tight leading-none font-Saira text-primary-main md:text-4xl lg:text-6xl dark:text-[#fafaf5]">
            We Are Trusted Name in Chauffeur Services
          </h1>
          <p className="mb-8 text-lg  text-justify font-normal text-[#010203] lg:text-base xl: dark:text-gray-400">
            Trusted in both chauffeur service & car rental, we deliver
            top-quality transportation. Whether you prefer driving yourself or a
            chauffeur, expect excellence from our top-tier vehicles or
            experienced drivers. Count on us for a stress-free, luxurious travel
            experience that exceeds expectations.
          </p>
          <div className="grid grid-cols-2">
            {ServiceList.map((service, index) => (
              <div className="text-primary-main md:my-4" key={index}>
                <Done />
                <span className="text-black text-xs md:ms-3">{service}</span>
              </div>
            ))}
          </div>
          <Link
            href="#"
            className="inline-flex items-center mt-4 justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-full bg-[#1565C0] hover:bg-primary-golden hover:text-black focus:ring-4 focus:ring-blue-300 duration-500 dark:focus:ring-blue-900"
          >
            <span className=" mr-1">
              <TimeToLeave fontSize="small" />
            </span>
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Section1;
