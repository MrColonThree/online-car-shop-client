import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BrandCard from "./BrandCard";

const Brands = () => {
  const { brands } = useContext(AuthContext);
  return (
    <div className="max-w-screen-xl mx-auto px-5 my-20">
      <h2>{brands.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {brands.map((brand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default Brands;
