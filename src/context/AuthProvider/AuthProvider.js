import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { createContext } from "react";
import app from "../../firebase/firebase-config";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(auth.currentUser);

  const loginUser = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutUser = () => {
    return signOut(auth);
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged( auth, currentUser =>{
        setUser(currentUser)
        setLoading(false)
    })

    return ()=> unsubscribe()
},[])
  const authInfo = { user, loading, loginUser, logoutUser};

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
