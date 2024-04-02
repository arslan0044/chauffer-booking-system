"use client";
import React, { useState, useEffect } from "react";
import GallerySection from "../../../components/Home/GallerySection";

export default function page() {
  //   const [data, setData] = useState([]);
  const [imgdata, setImgData] = useState(null);
  const onSubmithandler = async (e) => {
    e.preventDefault();
    if (!imgdata) {
      alert("Please Upload Image");
    }
    console.log({ imgdata });
    const formData = new FormData();
    formData.append("image", imgdata);
    const response = await fetch(`/api/gallery`, {
      method: "POST",
      body: formData,
    });
    const data = response.data;
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/gallery/`, {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    };

    getData();
  });
  return (
    <div className=" items-center justify-center flex flex-col">
      <form onSubmit={onSubmithandler} className=" h-48 flex items-center justify-center">
        <input
          onChange={(e) => setImgData(e.target.files[0])}
          type="file"
          name=""
          id=""
          // className="bg-primary-main text-primary-dark"
        />
        <button type="submit" className="px-4 rounded hover:bg-gray-700 bg-gray-800 text-primary-dark py-2">
          Upload
        </button>
      </form>
      <div className=" ">
      <GallerySection />
      </div>
    </div>
  );
}
