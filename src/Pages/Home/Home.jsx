import { useEffect } from "react";
import Brands from "../../Components/Brands/Brands";
import ContactSection from "../../Components/Contact/ContactSection";
import Header from "../../Components/Header/Header";
import Team from "../../Components/Team Section/Team";
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <Brands />
      <Team />
      <ContactSection />
    </div>
  );
};

export default Home;
