'use client'
import Navbar from "../components/Navbar";
import HomeSlider from "../components/Home/HomeSlider";
import Image from "next/image";
import GallerySection from "../components/Home/GallerySection";
// import  {useShowFleetQuery}  from "@/provider/redux/services/apiSlice";

export default function Home() {
  const cdata = { Name: "luxury chauffeur", Email: "info@citisolution.com" };
  // const { isLoading, data, isError } = useShowFleetQuery;
  return (
    <>
      <section>
        <Navbar Name={cdata.Name} />
        <main className="mt-[40px] mx-auto w-full py-6 lg:py-8 bg-white dark:bg-gray-900">
          <HomeSlider />
          <GallerySection/>
        </main>
        {/* <Footer Name={data.Name} email={data.Email} /> */}
      </section>
    </>
  );
}
