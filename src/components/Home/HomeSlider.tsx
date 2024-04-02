"use client";
import React from "react";
import PageCover from "../PageCover";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
function HomeSlider() {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <PageCover
            IMGURL="https://img.freepik.com/free-photo/woman-getting-taxi-car_23-2149149625.jpg"
            Title="Luxury Chauffeur Service"
            Des="At Gulf Luxury Cars, we pride ourselves on offering unparalleled luxury transportation solutions in the vibrant city of Dubai. With our exquisite fleet of vehicles and exceptional Dubai Chauffeur Service, we ensure that your journey is nothing short of extraordinary."
          />
        </SwiperSlide>
        <SwiperSlide>
          <PageCover
            IMGURL="https://img.freepik.com/free-photo/woman-getting-taxi-car_23-2149149625.jpg"
            Title="Luxury Chauffeur Service"
            Des="At Gulf Luxury Cars, we pride ourselves on offering unparalleled luxury transportation solutions in the vibrant city of Dubai. With our exquisite fleet of vehicles and exceptional Dubai Chauffeur Service, we ensure that your journey is nothing short of extraordinary."
          />
        </SwiperSlide>
        <SwiperSlide>
          <PageCover
            IMGURL="https://img.freepik.com/free-photo/woman-getting-taxi-car_23-2149149625.jpg"
            Title="Luxury Chauffeur Service"
            Des="At Gulf Luxury Cars, we pride ourselves on offering unparalleled luxury transportation solutions in the vibrant city of Dubai. With our exquisite fleet of vehicles and exceptional Dubai Chauffeur Service, we ensure that your journey is nothing short of extraordinary."
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default HomeSlider;
