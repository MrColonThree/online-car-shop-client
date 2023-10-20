import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const ContactSection = () => {
  const { dark } = useContext(AuthContext);
  return (
    <div className="max-w-screen-xl mx-auto p-5 my-20  ">
      <h1 className="text-5xl text-center my-10 font-bold title-font uppercase tracking-wider">
        Contact Us
      </h1>
      <div className="bg-contact bg-cover relative py-20 px-5">
        <div className="flex flex-col md:flex-row gap-5 mb-10">
          <div
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            className={`p-5 rounded text-center space-y-3 shadow-lg flex-1 z-30 font-semibold`}
          >
            <img
              className="w-20 h-20 mx-auto rounded-full"
              src="https://i.ibb.co/QC3s2PR/Lets-Talk-logo-transparent-268x300.png"
              alt=""
            />
            <h2 className="text-lg md:text-xl font-semibold">
              Talk to our Sales team
            </h2>
            <p className="font-semibold">
              We help you to find the right products with pricing
            </p>
            <p>Email: automotiveoasissupport@gmail.com</p>
            <p>Phone: 0966-549-896</p>
          </div>
          <div
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            className={`p-5 rounded text-center space-y-3 shadow-lg flex-1 z-30 font-semibold`}
          >
            <img
              className="w-16  mx-auto rounded-full"
              src="https://i.ibb.co/dBx5WBy/car-service-icon-vehicle-maintenance-auto-repair-mechanic-garage-automobile-repair-shop-automotive-w.jpg"
              alt=""
            />
            <h2 className="text-lg md:text-xl font-semibold">
              Servicing and repairing support
            </h2>
            <p className="font-semibold">
              We will fix your vehicle's technical problems by our experienced
              technician
            </p>
            <p>Email: automotiveoasisservicing@gmail.com</p>
            <p>Phone: 0966-549-896</p>
          </div>
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full ${
            dark ? "bg-black/60" : "bg-white/60"
          }  flex justify-center items-center`}
        ></div>
      </div>
    </div>
  );
};

export default ContactSection;
