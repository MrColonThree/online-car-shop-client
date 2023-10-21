import { Outlet } from "react-router-dom";
import CustomizeNavbar from "../Components/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  const { dark } = useContext(AuthContext);
  return (
    <div className={`relative exo ${dark ? "black-mode" : ""}`}>
      <CustomizeNavbar></CustomizeNavbar>
      <div className="min-h-[90vh]">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
