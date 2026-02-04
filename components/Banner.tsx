"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const banners = [
  {
    image: "/Banner/banner1.png",
  },
  {
    image: "/Banner/banner1.png",
  },
];

export default function Banner() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg relative">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        className="h-48 sm:h-56 md:h-64"
      >
        {banners.map((b, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <Image
                src={b.image}
                alt="Banner"
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition">
        <ChevronLeft className="text-white" size={20} />
      </button>
      <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition">
        <ChevronRight className="text-white" size={20} />
      </button>
    </div>
  );
}
