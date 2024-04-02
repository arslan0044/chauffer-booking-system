import React from "react";

function FixedCover() {
  return (
    <section className="bg-[#fafaf5] dark:bg-gray-900 max-w-screen-2xl mx-auto">
      <div
        className="relative overflow-auto bg-fixed bg-cover bg-no-repeat"
        style={{
          backgroundPosition: "80%",
          backgroundImage: `url("https://img.freepik.com/free-photo/parking-valet-his-job-with-vehicle-woman_23-2149946662.jpg?w=1060&t=st=1708152340~exp=1708152940~hmac=d06a8c298b5a4618fc65db957cd618e5e11b8362b5c40661a3d1be4ca3b94b3d")`,
        //   backdropFilter: "blur(12px)",
          height: "600px",
        }}
      >
        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.5)] bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-[#fafaf5] md:px-72">
              <h1 className="mt-2 mb-12 capitalize text-2xl font-Saira font-bold md:text-3xl xl:text-6xl underline underline-offset-[1.5rem] decoration-primary-golden">
                {"Luxury Chauffeur Service"}
              </h1>
              <p className="mt-4 mb-16">{"Choose From Our Luxury Fleet"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FixedCover;
