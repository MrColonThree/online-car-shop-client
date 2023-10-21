import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { BsArrowUpSquare } from "react-icons/bs";

const Footer = () => {
  const { dark } = useContext(AuthContext);
  const handleGoToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer
      className={`w-full p-8 border-t ${dark ? "" : "bg-gray-900 text-white"}`}
    >
      <div
        className={`flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:justify-between`}
      >
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo-ct" className="w-16" />
          <h3 className="text-2xl uppercase">Automotive Oasis</h3>
          <button onClick={handleGoToTop} className="text-lg ml-5">
            <BsArrowUpSquare />
          </button>
        </div>
        <ul className="flex flex-wrap justify-center gap-5 items-center gap-y-2 gap-x-8">
          <li>About Us</li>
          <li>License</li>
          <li>Contribute</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <h2 className={`text-center`}>&copy; 2023 Automotive Oasis</h2>
    </footer>
  );
};

export default Footer;
