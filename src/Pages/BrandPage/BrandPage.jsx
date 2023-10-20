import { useEffect } from "react";
import BrandBanner from "../../Components/BrandBanner/BrandBanner";
import Products from "../../Components/Products/Products";

const BrandPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <BrandBanner />
      <Products />
    </div>
  );
};

export default BrandPage;
