import React from "react";
import Link from "next/link";
function WhyChoice() {
  return (
    <section className=" max-w-screen-xl mx-auto">
      <div className=" flex flex-row justify-between">
        <div className="grid max-w-screen-xl  py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-6  px-8 py-8">
            <span className="text-xl  font-bold text-primary-main font-Saira">
              Best valued car rental & chauffeur service you will ever find.
            </span>
            <h1 className="max-w-2xl mb-4 mt-4 text-2xl font-bold leading-none md:text-3xl xl:mt-4 xl:text-6xl font-Saira  dark:text-white">
              Why Choose
            </h1>
            <h1 className="max-w-2xl mb-4 mt-4 text-2xl font-bold leading-none md:text-3xl xl:mt-4 xl:text-6xl font-Saira text-primary-main dark:text-white">
              Luxury Chauffeur
            </h1>
            <p className="max-w-2xl mb-6 pr-5  lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-justify">
            Choose Gulf Luxury Cars for unparalleled elegance and service. Experience top-tier vehicles, 24/7 support, and a commitment to elevate every journey. Your luxury adventure starts here.
            </p>

          </div>
          <div className="hidden lg:flex-3 lg:relative lg:mt-0 lg:col-span-6 lg:flex">
            <img
              className=" absolute object-contain"
              //   width={1000}
              //   height={1000}
              //   quality={90}
              //   loading="eager"
              priority="true"
              alt="Picture of the author"
              src={
                "https://gulfluxurycars.com/wp-content/uploads/2023/12/2023_24-1-1.webp"
              }
            />
          </div>
        </div>
      </div>

    </section>
  );
}

export default WhyChoice;
