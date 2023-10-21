import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
const MyCart = () => {
  const { user, dark } = useContext(AuthContext);
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
        fetch(
          `https://online-car-shop-server-8px3eqa97-abdullah-al-monirs-projects.vercel.app/cart/${id}`,
          {
            method: "DELETE",
          }
        )
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
  const handlePurchase = (names) => {
    Swal.fire(
      "Congrats",
      `You have successfully purchased ${names.map((name) =>
        name.split(", ").join(", & ")
      )} at the price of $${formatNumberWithCommas(totalPrice)}.`,
      "success"
    );
  };
  return (
    <div className="max-w-screen-xl mx-auto px-5">
      <div className="text-center my-10">
        <button
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
          className="text-4xl font-bold p-1 border-b-2 uppercase"
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
            <thead
              className={`uppercase  text-center border-2 ${
                dark ? "border-white" : "border-black"
              }`}
            >
              <tr>
                <th
                  scope="col"
                  className="p-2 md:px-4 md:py-2 lg:px-6 lg:py-3 "
                >
                  Serial
                </th>
                <th scope="col" className="p-2 md:px-4 md:py-2 lg:px-6 lg:py-3">
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden md:flex p-2 md:px-4 md:py-2 lg:px-6 lg:py-3"
                >
                  Brand
                </th>
                <th scope="col" className="p-2 md:px-4 md:py-2 lg:px-6 lg:py-3">
                  Price
                </th>
                <th scope="col" className="p-2 md:px-4 md:py-2 lg:px-6 lg:py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts &&
                filteredProducts.map((product, idx) => (
                  <tr
                    key={idx}
                    className={`border-x-2 text-center ${
                      dark ? "border-white" : "border-black"
                    } ${
                      idx + 1 === filteredProducts.length
                        ? "border-b-2"
                        : "border-b"
                    }`}
                  >
                    <td className="p-2 md:px-4 md:py-2 lg:px-6 lg:py-3">
                      {idx + 1}
                    </td>
                    <th
                      scope="row"
                      className="p-2 md:px-4 md:py-2 lg:px-6 lg:py-3 font-semibold whitespace-nowrap"
                    >
                      {product.product.name}
                    </th>
                    <td className="hidden md:flex p-2 md:px-4 md:py-2 lg:px-6 lg:py-3">
                      {product.product.brand}
                    </td>
                    <td className="p-2 md:px-4 md:py-2 lg:px-6 lg:py-3">
                      ${product.product.price}
                    </td>
                    <td className="p-2 md:px-4 md:py-2 lg:px-6 lg:py-3 flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 text-2xl hover:underline"
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
            <button
              onClick={() =>
                handlePurchase(
                  filteredProducts.map((product) => product.product.name)
                )
              }
              className="text-xl text-white font-bold px-4 py-1 rounded bg-green-500 my-5 uppe"
            >
              Purchase
            </button>
          </div>
          <Tooltip id="my-tooltip"></Tooltip>
        </div>
      )}
    </div>
  );
};

export default MyCart;
