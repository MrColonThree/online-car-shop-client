import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AddProduct from "../Pages/AddProduct/AddProduct";
import MyCart from "../Pages/MyCart/MyCart";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import BrandPage from "../Pages/BrandPage/BrandPage";
import Update from "../Pages/Update/Update";
import ProductDetails from "../Components/Products/ProductDetails";
import PrivateRoute from "./PrivateRoute";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addProduct",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <MyCart></MyCart>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:7000/cart"),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/brand/:name",
        element: <BrandPage />,
        loader: ({ params }) =>
          fetch(`http://localhost:7000/brand/${params.name}`),
      },
      {
        path: "/details/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:7000/products/${params.id}`),
      },
      {
        path: "/update/:id",
        element: <Update />,
        loader: ({ params }) =>
          fetch(`http://localhost:7000/products/${params.id}`),
      },
    ],
  },
]);

export default Route;
