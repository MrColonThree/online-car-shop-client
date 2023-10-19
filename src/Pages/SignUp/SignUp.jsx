import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsEyeSlashFill, BsEyeFill, BsGoogle } from "react-icons/bs";
import { AuthContext } from "../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AiFillInfoCircle } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();
  const authInfo = useContext(AuthContext);
  const { createUser, googleSignIn, setUser } = authInfo;
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSignIn = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.password1.value;
    console.log("SignIn: ", name, email, password);
    if (password !== confirmPassword) {
      return setError("Password don't match");
    }
    if (password.length < 6) {
      return setError("Password should be at least 6 characters long.");
    }

    if (!/[A-Z]/.test(password)) {
      return setError("Password should contain at least one capital letter.");
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      return setError(
        "Password should contain at least one special character."
      );
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateProfile(user, { displayName: name, photoURL: photo }).then(() => {
          // update the user name and photo after creating user
          setUser((currentUser) => {
            currentUser.displayName = name;
            currentUser.photoURL = photo;
            e.target.reset();
            navigate("/");
            return Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully!",
              showConfirmButton: false,
              timer: 1000,
            });
          });
        });
      })
      .catch((error) => {
        let errorMessage = "An error occurred while creating the user account.";

        if (error.code === "auth/email-already-in-use") {
          errorMessage =
            "The email address is already in use. Please use a different email.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address.";
        } else if (error.code === "auth/weak-password") {
          errorMessage =
            "The password is too weak. Please choose a stronger password.";
        }

        return setError(errorMessage);
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigate("/");
        return Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User logged in successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch(() => {
        let errorMessage = "An error occurred while creating the user account.";
        return setError(errorMessage);
      });
  };

  return (
    <div className="flex justify-center items-center my-10 max-w-5xl mx-auto min-h-[85vh]">
      <form
        onSubmit={handleSignIn}
        className="w-3/4 md:w-4/6 lg:w-1/2 mx-20   border-2 rounded-2xl py-12 px-10 md:px-20 shadow-xl"
      >
        <img className="w-24 mx-auto" src="logo.png" alt="" />
        <h1 className="text-center my-3 text-3xl font-bold">Automotive Oasis</h1>
        <div className="mb-3">
          <label className="block mb-2 font-medium ">Your name</label>
          <input
            type="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 theme:bg-gray-200 theme:border-gray-600 theme:placeholder-gray-700 theme:text-black theme:focus:ring-red-500 theme:focus:border-red-500"
            placeholder="your name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2 font-medium ">Photo</label>
          <input
            type="text"
            name="photo"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 theme:bg-gray-200 theme:border-gray-600 theme:placeholder-gray-700 theme:text-black theme:focus:ring-red-500 theme:focus:border-red-500"
            placeholder="your photo url"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2 font-medium ">Your email</label>
          <input
            type="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
            placeholder="yourmail@example.com"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium ">
            Your password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              placeholder="your password"
              required
            />
            <button
              className="text-lg absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <BsEyeFill></BsEyeFill>
              ) : (
                <BsEyeSlashFill></BsEyeSlashFill>
              )}
            </button>
          </div>
          <div className=" mt-2 flex gap-2">
            <AiFillInfoCircle className="text-xl"></AiFillInfoCircle>
            <p className="text-sm">
              Use at least 6 characters, one uppercase, one lowercase and one
              special character.
            </p>
          </div>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium ">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              placeholder="confirm password"
              required
            />
            <button
              className="text-lg absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <BsEyeFill></BsEyeFill>
              ) : (
                <BsEyeSlashFill></BsEyeSlashFill>
              )}
            </button>
          </div>
        </div>
        {error && <div className="text-red-500 rounded-lg  mb-5">{error}</div>}
        <div className="flex items-start mb-3">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300"
              required
            />
          </div>
          <label className="ml-2 text-sm font-medium">
            Accept Our Terms & Conditions
          </label>
        </div>
        <div className="mb-3">
          <h2>
            Already have an account?{" "}
            <NavLink className="text-red-600 font-semibold" to="/login">
              Login
            </NavLink>
          </h2>
        </div>
        <button
          type="submit"
          className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
        >
          Register
        </button>
        <div className="flex text-center items-center justify-center gap-2 my-5">
          <hr className="w-full border" />
          <h2 className="text-center w-80">Register with</h2>
          <hr className="w-full border" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          type="submit"
          className="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full px-10 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800 flex gap-2 items-center justify-center"
        >
          <BsGoogle className="text-lg"></BsGoogle>
          Google
        </button>
      </form>
    </div>
  );
};

export default Register;
