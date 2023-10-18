import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
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
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7000/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:7000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const observer = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      observer();
    };
  });
  const authInfo = {
    brands,
    products,
    signInUser,
    googleSignIn,
    user,
    setUser,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
