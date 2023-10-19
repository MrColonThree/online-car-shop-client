// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const Header = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        // autoplay={{
        //   delay: 1500,
        //   disableOnInteraction: false,
        //   speed: 10000,
        // }}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
        <video className="w-full h-full" controls>
        <source src="https://youtube/eH-F8QfS1Xk?si=urPcgQlH6qEw4yjq" type="video/mp4" />
      </video>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full mx-auto lg:h-[750px]"
            src="https://images.unsplash.com/photo-1682687220866-c856f566f1bd"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full mx-auto lg:h-[750px]"
            src="https://images.unsplash.com/photo-1682687220866-c856f566f1bd"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Header;
