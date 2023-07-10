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

  // state of loading
  const [loading, setLoading] = useState(true);

  // sign in google
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  // sign in facebook
  const facebookSiginIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
  };

  // loguut
  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    // dimount
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
      }
    });
    // willunmout
    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ facebookSiginIn, googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
