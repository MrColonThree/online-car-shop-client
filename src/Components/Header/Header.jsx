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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
const Header = () => {
  const { dark, setLoading } = useContext(AuthContext);
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    fetch(
      "https://online-car-shop-server-8px3eqa97-abdullah-al-monirs-projects.vercel.app/banners"
    )
      .then((res) => res.json())
      .then((data) => {
        setBannerData(data);
        setLoading(false);
      });
  }, [setLoading]);
  return (
    <div className="">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {bannerData &&
          bannerData.map((banner) => (
            <SwiperSlide key={banner._id}>
              <img
                className="w-full mx-auto lg:h-[750px] md:h-[500px] h-[400px] relative"
                src={banner.image}
                alt=""
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-200 to-teal-500 opacity-30 flex justify-center items-center"></div>
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 max-w-screen-md mx-auto w-[70vw] ${
                  dark ? "bg-black/50" : "bg-white/50"
                } px-5 py-5 rounded`}
              >
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 uppercase">
                  {banner.title}
                </h1>
                <p className="text-lg lg:text-2xl">{banner.description}</p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Header;
