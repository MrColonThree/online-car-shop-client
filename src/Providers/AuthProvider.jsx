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
  useEffect(() => {
    fetch("http://localhost:7000/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const observer = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      observer();
    };
  });
  const authInfo = {
    createUser,
    brands,
    loading,
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
