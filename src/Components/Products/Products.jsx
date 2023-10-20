import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
const Products = () => {
  const loadedBrand = useLoaderData();
  console.log(loadedBrand);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://online-car-shop-server-8px3eqa97-abdullah-al-monirs-projects.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const currentProducts = products.filter(
    (product) =>
      product.brand.toLowerCase() === loadedBrand.brand_name.toLowerCase()
  );
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="px-5 my-20 max-w-screen-xl mx-auto">
      <h2 className="text-center text-5xl font-semibold my-10 title-font uppercase">
        {loadedBrand.brand_name}
      </h2>
      {currentProducts.length === 0 ? (
        <div className="text-center py-32">
          <h1 className="text-4xl mb-5">Sorry!</h1>{" "}
          <p className="text-2xl">We are out of stock</p>
          <button
            onClick={handleGoBack}
            className="text-lg font-semibold text-white bg-red-500 px-4 py-1 mt-5 rounded"
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {currentProducts && currentProducts.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
