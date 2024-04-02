"use client";
// import { axios } from "axios";
import React, { useState, useEffect,  } from "react";
import Spinner from "../../../../../components/Spinner"
function FleetPage({ params }) {
  const [data, setData] = useState([]);
  const [imgdata,setImgData]=useState(null)
  const onSubmithandler = async (e)=>{
    e.preventDefault()
    if(!imgdata){
      alert("Please Upload Image")
    }
    console.log({imgdata})
    const formData= new FormData();
    formData.append("image",imgdata)
    const response = await fetch(`/api/gallery`,{
      method:"POST",
      body: formData
    })
    const data = response.data;
  }

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/fleet/${params._id}`, {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    };

    getData();
  }, []);
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