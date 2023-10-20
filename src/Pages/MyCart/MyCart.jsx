import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
const MyCart = () => {
  const { user } = useContext(AuthContext);
  const loadedCartProducts = useLoaderData();
  const [cartProducts, setCartProducts] = useState(loadedCartProducts);
  // to get userId of logged in user
  const userUID = user.uid;
  const filteredProducts = cartProducts.filter(
    (item) => item.user_id === userUID
  );
  // to replace the price value from string to number and calculate total price
  const totalPrice = filteredProducts
    .map((p) => p.product)
    .reduce(
      (acc, product) => acc + parseFloat(product.price.replace(/,/g, "")),
      0
    );

  // to format the total price with commas
  function formatNumberWithCommas(price) {
    const parts = price.toString().split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] || ""; //
    let formattedInteger = "";
    const length = integerPart.length;
    for (let i = 0; i < length; i++) {
      if (i > 0 && (length - i) % 3 === 0) {
        formattedInteger += ",";
      }
      formattedInteger += integerPart[i];
    }
    const formattedNumber = decimalPart
      ? formattedInteger + "." + decimalPart
      : formattedInteger;
    return formattedNumber;
  }
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
              const remaining = filteredProducts.filter(
                (product) => product._id !== id
              );
              setCartProducts(remaining);
              Swal.fire("Removed!", "Product has been removed.", "success");
            }
          });
      }
    });
  };
  console.log(filteredProducts);
  console.log(filteredProducts.map((p) => p._id));
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
        <div className="">
          <table className="w-full text-sm text-left ">
            <thead className="uppercase  text-center border">
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
              {filteredProducts.map((product, idx) => (
                <tr key={idx} className=" border-b border-x text-center">
                  <td className="px-6 py-4">{idx + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {product.product.name}
                  </th>
                  <td className="px-6 py-4">{product.product.brand}</td>
                  <td className="px-6 py-4">${product.product.price}</td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
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
          <div className="my-10 text-right mr-5 font-semibold">
            <p>Total Price: ${formatNumberWithCommas(totalPrice)}</p>
          </div>
          <Tooltip id="my-tooltip"></Tooltip>
        </div>
      )}
    </div>
  );
};

export default MyCart;
