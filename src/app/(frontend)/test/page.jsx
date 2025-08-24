"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getGallery } from "@/lib/actions";

function page() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        setIsLoading(true);
        const galleryData = await getGallery();
        setData(galleryData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGallery();
  }, []);

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          {data.map((e) => (
            <Image key={e._id} alt={`${e._id}`} src={e.img} width={200} height={200} />
          ))}
        </>
      ) : null}
    </div>
  );
}

export default page;