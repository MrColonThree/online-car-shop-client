import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { BallTriangle } from "react-loader-spinner";
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dark, setTheme] = useState(false);
  // to get theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme === "dark");
    }
  }, []);

  // toggle changed theme and save the theme in local storage
  const toggleTheme = () => {
    setTheme((prevDark) => {
      const newTheme = !prevDark ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return !prevDark;
    });
  };
  // to get brands data
  useEffect(() => {
    fetch(
      "https://online-car-shop-server-8px3eqa97-abdullah-al-monirs-projects.vercel.app/brands"
    )
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);
  // to create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // to sign in
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // to sign in with google
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // to logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  // to observe the user is logged in or out
  useEffect(() => {
    const observer = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      observer();
    };
  });
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }
  const authInfo = {
    createUser,
    brands,
    loading,
    setLoading,
    signInUser,
    googleSignIn,
    user,
    setUser,
    logOut,
    dark,
    toggleTheme,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
