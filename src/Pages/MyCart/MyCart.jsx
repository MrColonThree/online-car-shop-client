import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { data } from "autoprefixer";
const MyCart = () => {
  const loadedCartProducts = useLoaderData();
  const [cartProducts, setCartProducts] = useState(loadedCartProducts);
  const [quantity, setQuantity] = useState({});
  const addMultiple = (id) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [id]: (prevQuantity[id] || 0) + 1,
    }));
  };

  const decreaseProduct = (id) => {
    setQuantity((prevQuantity) => {
      const currentQuantity = prevQuantity[id] || 0;
      if (currentQuantity > 0) {
        return {
          ...prevQuantity,
          [id]: currentQuantity - 1,
        };
      }
      return prevQuantity;
    });
  };
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove Product from Cart!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:7000/cart/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = cartProducts.filter((user) => user._id !== id);
              setCartProducts(remaining);
              Swal.fire("Removed!", "Product has been removed.", "success");
            }
          });
      }
    });
  };
  return (
    <div className="max-w-screen-xl mx-auto px-5">
      <div className="text-center my-10">
        <button
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
          className="text-4xl font-bold p-1 border-b-2"
          disabled
        >
          My Cart
        </button>
      </div>
      {cartProducts.length === 0 && (
        <div className="text-center text-3xl my-40">Cart Is empty!</div>
      )}
      {cartProducts.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className=" text-gray-700 uppercase bg-gray-50 text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Serial
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product, idx) => (
                <tr key={idx} className="bg-white border-b text-center">
                  <td className="px-6 py-4">{idx + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4">{product.brand}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => addMultiple(product._id)}
                      className="font-medium text-black hover:underline text-2xl"
                    >
                      <AiOutlinePlusSquare></AiOutlinePlusSquare>
                    </button>
                    <p className="font-semibold ">
                      {quantity[product._id] || 1}
                    </p>
                    <button
                      onClick={() => decreaseProduct(product._id)}
                      className="font-medium hover:underline text-2xl text-black"
                    >
                      <AiOutlineMinusSquare></AiOutlineMinusSquare>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="font-medium text-red-600 text-2xl hover:underline"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Remove product"
                    >
                      <MdDeleteForever></MdDeleteForever>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Tooltip id="my-tooltip"></Tooltip>
        </div>
      )}
    </div>
  );
};

export default MyCart;
