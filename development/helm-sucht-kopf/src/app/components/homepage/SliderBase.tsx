"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

type SliderBaseProps = {
  data: Array<any>;
  renderSlide: (item: any, index: number) => React.ReactNode;
  slidesPerView?: number;
};

export default function SliderBase({
  data,
  renderSlide,
  slidesPerView = 1.15,
}: SliderBaseProps) {
  return (
    <Swiper
      navigation={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Keyboard]}
      pagination={true}
      spaceBetween={20}
      slidesPerView={slidesPerView}
      breakpoints={{
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      }}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>{renderSlide(item, index)}</SwiperSlide>
      ))}
    </Swiper>
  );
}
