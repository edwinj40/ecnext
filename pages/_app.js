// en esta app se importa todo lo global
import React, { useState, useEffect, useMemo } from "react";
import {ToastContainer, toast} from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import { setToken, getToken, removeToken } from "../api/token";
import "../scss/global.scss"
import 'semantic-ui-css/semantic.min.css'
import "react-toastify/dist/reactToastify.css";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [realoadUser, setReloadUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // usamos funcion de token.js
    const token = getToken();
    // si token existe esta logeado el user
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [realoadUser]);




  const login = (token) => {
    setToken(token);
    // guardamos id de usuario en auth el estado global
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      // borro datos de usuario
      setAuth(null);
      // mandamos usuario a home page
      router.push("/");
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  //  esta comprobando si usuario logeado
  if (auth === undefined) return null;

  return (
  <AuthContext.Provider value={authData}>
  <Component {...pageProps} />
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover
   />
  </AuthContext.Provider >
  );
}


