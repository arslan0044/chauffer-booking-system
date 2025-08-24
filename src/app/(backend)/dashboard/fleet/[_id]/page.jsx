"use client";
import React, { useState, useEffect } from "react";
import Spinner from "../../../../../components/Spinner";
import { getFleetById } from "@/lib/actions";

function FleetPage({ params }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const result = await getFleetById(params._id);
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching fleet:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [params._id]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="">
      <div className=" grid grid-cols-3">
        <div className=" bg-green-400 col-span-2 ">
          {data.model}<br/>
          {data.price}<br/>
          {data.type}<br/>
          {data.doors}<br/>
          {data.seats}<br/>
        </div>
        <div  className=" bg-slate-400 col-span-1 ">
          <img  src={data.img} alt="" />
        </div>
        
      </div>

    </section>
  );
}

export default FleetPage;