import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const ContactSection = () => {
  const { dark } = useContext(AuthContext);
  const [contact, setContact] = useState([]);
  useEffect(() => {
    fetch("https://online-car-shop-server-8px3eqa97-abdullah-al-monirs-projects.vercel.app/contact")
      .then((res) => res.json())
      .then((data) => setContact(data));
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto p-5 my-20  ">
      <h1 className="text-5xl text-center my-10 font-bold title-font uppercase tracking-wider">
        Contact Us
      </h1>
      <div className="bg-contact bg-cover relative py-20 px-5 md:px-10">
        <div className="flex flex-col md:flex-row gap-5 my-10">
          {contact && contact.map((c) => (
            <div
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
              className={`p-5 rounded text-center space-y-3 shadow-lg flex-1 font-semibold z-30 border ${dark ? "border-white shadow-white":" border-black shadow-black"}`}
              key={c.title}
            >
              <img
                className="w-20 h-20 mx-auto rounded-full"
                src={c.icon}
                alt=""
              />
              <h2 className="text-lg md:text-xl font-semibold">{c.title}</h2>
              <p className="font-semibold">{c.description}</p>
              <p>Email: {c.email}</p>
              <p>Phone: {c.phone}</p>
            </div>
          ))}
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full ${
            dark ? "bg-black/60" : "bg-white/70"
          }  flex justify-center items-center`}
        ></div>
      </div>
    </div>
  );
};

export default ContactSection;
