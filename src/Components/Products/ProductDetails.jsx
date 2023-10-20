import { BsCaretLeftFill, BsCartPlus } from "react-icons/bs";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Ratings from "../Ratings/Ratings";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const ProductDetails = () => {
  const product = useLoaderData();
  const navigate = useNavigate();
  const { dark, user } = useContext(AuthContext);
  const { name, brand, image, type, rating, price, details } = product;

  const handleAddToCart = () => {
    // to get the user Id from firebase
    const userUID = user.uid;
    // to send the user Id with product data
    const productWithUserId = {
      user_id: userUID,
      product: {
        name,
        brand,
        price,
      },
    };
    console.log(productWithUserId);
    fetch("http://localhost:7000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productWithUserId),
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
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="max-w-screen-xl mx-auto flex items-center justify-center min-h-[70vh] my-10 lg:my-20 px-5">
      <div
        className={`p-5 flex flex-col lg:flex-row shadow-lg border rounded ${
          dark ? "" : "bg-gray-300"
        }`}
      >
        <img
          className="w-full lg:w-4/6 h-[350px] md:h-[500px] lg:h-[500px]"
          src={image}
          alt=""
        />
        <div className="px-5 pt-5 lg:pt-0 lg:w-1/2 relative pb-10 lg:pb-auto">
          <h1 className="text-4xl font-bold mb-3 uppercase">
            {name} <span className="font-semibold">({brand})</span>
          </h1>
          <p className="text-lg">{type}</p>
          <div className="flex items-center text-lg">
            <Ratings />
            {rating}
          </div>
          <p className="text-xl">
            Price: <span className="font-semibold">${price}</span>
          </p>
          <hr className="m-2 border" />
          <p className="">{details}</p>
          <button
            onClick={handleGoBack}
            className="text-lg font-semibold text-white bg-red-500 px-2 py-1 mt-3 rounded bottom-0 left-5 absolute flex items-center"
          >
            <BsCaretLeftFill className="text-xl"></BsCaretLeftFill>Go Back
          </button>
          <button
            onClick={handleAddToCart}
            className="text-lg font-semibold text-white bg-green-600 px-2 py-1 mt-3 rounded bottom-0 right-0 absolute flex items-center gap-2"
          >
            <BsCartPlus className="text-xl" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
