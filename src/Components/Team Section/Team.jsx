import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Member from "./Member";
import { useEffect, useState } from "react";

const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/team")
      .then((res) => res.json())
      .then((data) => setTeam(data));
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto my-20 px-5">
      <div><h2 className="text-5xl text-center my-10 font-bold title-font uppercase">Our Team</h2></div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {team.map((member) => (
          <SwiperSlide key={member._id}>
            <Member member={member}></Member>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Team;
