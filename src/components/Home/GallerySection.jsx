"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"
function GallerySection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/gallery", {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    };

    getData();
  }, []);
  return (
    <section className="bg-white max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-2">
        {data.map((i,index) => (
          <div key={index} className="w-full bg-cover h-72  overflow-hidden cursor-pointer">
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
  );
}

export default GallerySection;
