import { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { dark } = useContext(AuthContext);
  const product = useLoaderData();
  const { _id, name, brand, image, type, rating, price, details } = product;
  console.log(product);
  const handleAddToCart = (id) => {
    fetch("http://localhost:7000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          return Swal.fire(
            "Done!",
            "Product added to cart successfully!",
            "success"
          );
        }
      });
  };
  return (
    <div className="max-w-screen-xl mx-auto flex items-center justify-center min-h-[70vh] lg:my-auto md:my-20">
      <div className="px-5 flex flex-col lg:flex-row">
        <div className="border">
          <img
            className="w-full h-[400px] md:h-[500px] lg:h-[480px]"
            src={image}
            alt=""
          />
        </div>
        <div
          className={`border ${dark ? "" : "bg-red-100"} p-5 lg:w-1/2 flex-col`}
        >
          <h1 className="text-4xl font-bold my-3 uppercase">
            {name} <span className="font-semibold">({brand})</span>
          </h1>
          <p className="flex items-center">
            {type} <AiFillStar className="text-amber-600 text-xl"></AiFillStar>{" "}
            {rating}
          </p>
          <p className="text-xl">
            Price: <span className="font-semibold">${price}</span>
          </p>
          <hr className="my-2 border" />
          <p className="">{details}</p>
          <button
            onClick={() => handleAddToCart(_id)}
            className="text-lg font-semibold text-white bg-red-500 px-4 py-1 mt-3"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
