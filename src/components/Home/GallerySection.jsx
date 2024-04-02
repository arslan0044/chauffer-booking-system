"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGetGalleryQuery } from "@/redux/services/date";
function GallerySection() {
  const { isLoading, data, error } = useGetGalleryQuery();
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <section className="bg-white max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-2">
              {data.map((i, index) => (
                <div
                  key={index}
                  className="w-full bg-cover h-72  overflow-hidden cursor-pointer"
                >
                  <Image
                    src={i.img}
                    width={700}
                    height={700}
                    loading="lazy"
                    alt={i.img}
                    className="transform w-full h-full transition duration-1000 hover:scale-[1.1]"
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

export default GallerySection;
