import {
  EventSeat,
  Luggage,
  MeetingRoom,
  TimeToLeave,
} from "@mui/icons-material";
import React from "react";
// import Image from "next/image"

function CarCard({ Doors, Type, Seats, StritingPrice, Model,CardImg }) {
  return (
    <section className=" max-w-screen-md">
      <div className="border-t-4 flex flex-col border-primary-golden cursor-pointer hover:border-primary-main duration-500 rounded-b-3xl shadow-md">
        <div className="w-full bg-red-200 h-72">
          {" "}
          <div className="w-full bg-cover h-72  overflow-hidden">
            <img
              src={CardImg}
            //   width={700}
            //   height={700}
              // loading="lazy"
              alt={Model}
              className="transform w-full h-full  transition duration-1000 hover:scale-[1.1]"
            />
          </div>
        </div>
        <div className=" bg-slate-100 py-10 w-full grid place-items-center  items-center content-center">
          <h3 className=" font-bold text-xl text-primary-main font-Saira">
            Luxruy {Type}
          </h3>
          <h1 className="font-bold text-3xl">{Model}</h1>
        </div>
        <div className="flex flex-col mx-12">
          <div className=" text-center mb-5">
            <button className="bg-primary-golden px-4 py-1 font-Saira font-bold text-xl">
              Starting at {StritingPrice}$
            </button>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <span className="text-primary-main mr-2">
                {" "}
                <TimeToLeave fontSize="large" />
              </span>
              {Type}
            </div>
            <div>
              <span className="text-primary-main mr-2">
                {" "}
                <MeetingRoom fontSize="large" />
              </span>{" "}
              {Doors} Doors
            </div>
            <div>
              <span className="text-primary-main mr-2">
                <EventSeat fontSize="large" />
              </span>
              {Seats} Seats
            </div>
            <div>
              <span className="text-primary-main mr-2">
                <Luggage fontSize="large" />
              </span>{" "}
              Luggage
            </div>
          </div>
        </div>
        <div className="grid grid-flow-col mt-3">
          <button className="bg-black text-white  hover:bg-white hover:text-black px-6 rounded-s-full text-sm w-full py-3 duration-500">
            View Detail
          </button>
          <button className="bg-primary-main text-white hover:bg-primary-golden hover:text-black px-6 rounded-e-full text-sm w-full py-3 duration-500">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default CarCard;
