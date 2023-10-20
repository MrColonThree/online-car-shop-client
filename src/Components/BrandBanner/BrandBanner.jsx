import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useLoaderData } from "react-router-dom";

const BrandBanner = () => {
  const brand = useLoaderData();
  const banner = brand.brand_banner || "";
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          speed: 10000,
        }}
        slidesPerView={1}
      >
        {banner && banner.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img className="w-full mx-auto lg:h-[750px]" src={img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandBanner;
