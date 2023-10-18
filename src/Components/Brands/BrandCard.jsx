import { Link } from "react-router-dom";

const BrandCard = ({ brand }) => {
  const { brand_name, image_url } = brand;
  return (
    <Link to={`/brand/${brand_name}`}>
      <div className="p-5 border shadow-lg">
        <img className="w-full h-64 lg:h-72" src={image_url} alt="" />
        <h1 className="text-3xl font-semibold mt-5 text-center uppercase">
          {brand_name}
        </h1>
      </div>
    </Link>
  );
};

export default BrandCard;
