import { createContext, useContext, useEffect, useState } from 'react';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // state of user
  const [user, setUser] = useState({});

  // sign in google
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // sign in facebook
  const facebookSiginIn = async () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // loguut
  const logOut = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ facebookSiginIn, googleSignIn, logOut, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
