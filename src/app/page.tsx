"use client";
import Navbar from "../components/Navbar";
import HomeSlider from "../components/Home/HomeSlider";
import Image from "next/image";
import GallerySection from "../components/Home/GallerySection";
import Footer from "../components/Footer";
import CarsCardSection from "@/components/Home/CarsCardSection";
import Section1 from "../components/Section1";
import TextSection from "../components/Home/TextSection";
import WhyChoice from "../components/Home/WhyChoice";
import Section2 from "../components/Section2";
import CTASection from "@/components/CTASection";
// import GallerySection from "../components/Home/GallerySection";

export default function Home() {
  const data = { Name: "luxury chauffeur", Email: "info@citisolution.com" };
  return (
    <>
      <section>
        <Navbar Name={data.Name} />
        <main className="mt-[40px] mx-auto w-full py-6 lg:py-8 bg-white dark:bg-gray-900">
          <HomeSlider />
          <CarsCardSection />
          <TextSection />
          <WhyChoice />
          <Section1 />
          <Section2 />
          <GallerySection />
        </main>
        <CTASection
          title="Ready to Experience Luxury?"
          description="   Discover our premium fleet and book your next luxury transportation experience with us."
          button1={{
            text: "Explore Our Fleet",
            link: "/fleets",
            type: "primary",
          }}
          button2={{
            text: "Contact Us",
            link: "/contact",
            type: "secondary",
          }}
        />
        <Footer Name={data.Name} email={data.Email} />
      </section>
    </>
  );
}
