import { createContext, useContext, useEffect, useState } from 'react';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '@/firebase';

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
  const logOut = async () => {
    return signOut(auth);
  };

  //onAuthStateChanged
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (credential) => {
      if (user) {
        const data = JSON.parse(localStorage.getItem('credential')) || {};
        setUser(credential || data.user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ facebookSiginIn, googleSignIn, logOut, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
