import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";
const Products = () => {
  const loadedBrand = useLoaderData();
  console.log(loadedBrand);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const currentProducts = products.filter(
    (product) =>
      product.brand.toLowerCase() === loadedBrand.brand_name.toLowerCase()
  );
  return (
    <div className="px-5 my-20">
      <h2 className="text-center text-5xl font-semibold my-5">
        {loadedBrand.brand_name}
      </h2>
      {currentProducts.length === 0 ? (
        <div className="text-center py-32">
          <h1 className="text-3xl mb-5">Sorry!</h1>{" "}
          <p className="text-xl">We are out of stock</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
