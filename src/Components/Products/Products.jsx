import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";
const Products = () => {
  const loadedBrand = useLoaderData();
  const { products } = useContext(AuthContext);
  const currentProducts = products.filter(
    (product) =>
      product.brand.toLowerCase() === loadedBrand.brand_name.toLowerCase()
  );
  return (
    <div className="max-w-screen-xl mx-auto px-5 mt-20">
      <h2 className="text-center text-4xl font-semibold my-5">
        {loadedBrand.brand_name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
