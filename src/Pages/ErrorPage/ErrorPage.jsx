import CustomizeNavbar from "../../Components/Navbar/Navbar";

const ErrorPage = () => {
  return (
    <div>
      <CustomizeNavbar></CustomizeNavbar>
      <div className="max-w-screen-xl  mx-auto bg-error bg-cover h-[400px] md:h-[500px] lg:h-[800px] w-full"></div>
    </div>
  );
};

export default ErrorPage;
