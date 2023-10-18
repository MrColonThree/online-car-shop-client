import { AiFillStar } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  const product = useLoaderData();
  const { _id, name, brand, image, type, rating, price, details } = product;
  console.log(product);
  return (
    <div className="max-w-screen-xl mx-auto px-5">
      <h1 className="text-4xl font-bold my-3 uppercase">{name}</h1>

      <img className="w-full h-[650px]" src={image} alt="" />
      <div className="bg-red-100 p-5">
      <div className="flex justify-between items-center gap-5  text-xl font-semibold">
        <p>
          Brand:<span className="font-semibold">${brand}</span>
        </p>
        <p className="flex items-center">
          <AiFillStar className="text-amber-600 text-xl"></AiFillStar> {rating}
        </p>
      </div>
      <p className="text-xl">
        Price: <span className="font-semibold">${price}</span>
      </p>
      <hr className="my-2 border-2" />
      <p>{details}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
