import React from "react";
import CarCard from "../CarCard";
import Link from "next/link"
function CarsCard() {
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
        <CarCard
          Doors="4"
          Type={"SUV"}
          Seats={"5"}
          StritingPrice="500"
          Model={"Audi A8"}
          CardImg={
            "https://cache3.pakwheels.com/system/car_generation_pictures/6395/original/Audi_A8_Front.jpg"
          }
        />
        <CarCard
          Doors="4"
          Type={"Sedan"}
          Seats={"5"}
          StritingPrice="300"
          Model={"Tesla Model S"}
          CardImg={"https://cars.usnews.com/pics/size/390x290/images/Auto/izmo/i2386625/2016_tesla_model_s_angularfront.jpg"}
        />
        <CarCard
          Doors="4"
          Type={"SUV"}
          Seats={"5"}
          StritingPrice="700"
          Model={"Mercedes S Class"}
          CardImg={"https://imgd.aeplcdn.com/370x208/n/cw/ec/48067/s-class-exterior-right-front-three-quarter-9.jpeg"}
        />

      </div>
      <div className="grid place-items-center mt-5">
        <Link className=" bg-primary-golden hover:bg-primary-main rounded-full px-10 py-3 hover:text-white duration-300" href={"/fleet"}>VIEW ALL CAR</Link>
      </div>
    </section>
  );
}

export default CarsCard;
