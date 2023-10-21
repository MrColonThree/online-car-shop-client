import CustomizeNavbar from "../../Components/Navbar/Navbar";

const ErrorPage = () => {
  return (
    <div>
      <CustomizeNavbar></CustomizeNavbar>
      <div className="max-w-screen-xl  mx-auto bg-error bg-cover bg-center h-[300px] md:h-[500px] lg:h-[800px] w-full my-20"></div>
    </div>
  );
};

export default ErrorPage;
