"use client";
import React from "react";
function PageCover({
  Title,
  IMGURL,
  Des,
}: {
  Title: String;
  IMGURL: String;
  Des: String;
}) {
  return (
    <section className="max-w-screen-2xl mx-auto mt-0">
      <div
        className="relative overflow-hidden bg-cover  bg-no-repeat"
        style={{
          backgroundPosition: "80%",
          backgroundImage: `url("${IMGURL}")`,
          height: "700px",
        }}
      >
        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.5)] bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-[#fafaf5] md:px-72">
              <h1 className="mt-2 mb-12 capitalize text-2xl font-Saira font-bold md:text-3xl xl:text-6xl underline underline-offset-[1.5rem] decoration-primary-golden">
                {Title}
              </h1>
              <p className="mt-4 mb-16">{Des}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageCover;
