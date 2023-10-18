import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AddProduct from "../Pages/AddProduct/AddProduct";
import MyCart from "../Pages/MyCart/MyCart";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import BrandPage from "../Pages/BrandPage/BrandPage";

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
        element: <AddProduct />,
      },
      {
        path: "/cart",
        element: <MyCart />,
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
    ],
  },
]);

export default Route;
