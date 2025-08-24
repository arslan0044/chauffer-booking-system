import {
  Settings,
  Car,
  Users,
  MapPin,
} from "lucide-react";
import React from "react";
// import Link from "next/link";
function Section2() {
  const Steps = [
    {
      Title: "Book Online, by Phone, or In Person",
      Dis: "Choose your preferred booking method: Online for convenience, by Phone for personalized assistance, or In Person for a hands-on experience. Your reservation, your way.",
      icon: <Settings size={40} />,
    },
    {
      Title: "Receive Confirmation",
      Dis: "Get instant confirmation of your booking details, ensuring a hassle-free experience.",
      icon: <Car size={40} />,
    },
    {
      Title: "Professional Match-Up",
      Dis: "Our expert chauffeurs are assigned, guaranteeing skilled professionals for your journey.",
      icon: <Users size={40} />,
    },
    {
      Title: "Enjoy Your Ride",
      Dis: "Relax and indulge in a seamless and comfortable journey, knowing that your transportation needs are in capable hands.",
      icon: <MapPin size={40} />,
    },
  ];
  return (
    <section className=" my-14 dark:bg-gray-900">
      <div className="grid max-w-screen-xl  mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="hidden w-full h-full lg:mt-0 lg:col-span-5 lg:flex bg-[url('https://img.freepik.com/free-photo/businesswoman-getting-taxi-cab_23-2149236685.jpg')]  bg-no-repeat bg-cover">
          <div className="w-full h-full bg-primary-main/75 px-9 py-8">
            <p className="text-primary-golden text-3xl font-bold font-Saira">
              15% Off First Time Reservations
            </p>
            <h2 className="text-white text-5xl font-black font-Saira">
              4 Simple Steps To Hire A Chauffeur
            </h2>
          </div>
        </div>
        <div className="px-12 place-self-center py-10 lg:col-span-7">
          {Steps.map((i, index) => (
            <div className="grid grid-cols-12 my-4 items-center" key={index}>
              <div className="bg-primary-main rounded-full w-16 h-16 col-span-2 flex items-center justify-center">
                <span className="text-primary-golden font-black text-3xl">
                  {i.icon}
                </span>
              </div>
              <div className="col-span-10">
                <h2 className=" font-Saira text-3xl font-bold">{i.Title}</h2>
                <p>{i.Dis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Section2;
