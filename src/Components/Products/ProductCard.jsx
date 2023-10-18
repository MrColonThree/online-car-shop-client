import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, brand, image, type, rating, price, details } = product;
  const [showDetails, setShowDetails] = useState(details.slice(0, 100));
  const handleSeeMore = () => {
    setShowDetails(details);
  };
  return (
    <div className="p-5 border shadow-lg w-[350px] mx-auto md:w-full flex flex-col">
      <div className="flex justify-between items-center gap-5 mb-2">
        <h1 className="text-lg font-semibold">{name}</h1>
        <p>
          Price: <span className="font-semibold">${price}</span>
        </p>
      </div>
      <div className="relative">
        <img className="h-56 md:h-64 lg:h-72 w-full" src={image} alt="" />
        <p className="absolute right-3 bottom-3 bg-black/50 px-2 py-1 text-white">
          {type}
        </p>
      </div>

      <div className="flex justify-between items-center gap-5 mt-2">
        <p>Brand: {brand}</p>

        <p className="flex items-center">
          <AiFillStar className="text-amber-600 text-xl"></AiFillStar> {rating}
        </p>
      </div>
      <div className="flex-grow">
        <p className="text-sm mt-2">
          {showDetails}{" "}
          {showDetails.length <= 100 && (
            <button onClick={handleSeeMore} className="text-red-500">
              reed more...
            </button>
          )}
        </p>
      </div>
      <div className="flex justify-between gap-5 mt-3">
        <Link>
          <button className="text-lg font-semibold text-white bg-red-500 px-4 py-1">
            Details
          </button>
        </Link>
        <Link>
          <button className="text-lg font-semibold text-white bg-red-500 px-4 py-1">
            Update
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
