import React, { useState, useMemo, useEffect } from 'react';
import { Provider as PaperProvider } from "react-native-paper"
import jwtDecode from 'jwt-decode';
import AppNavigation from "./src/navigation/AppNavigation"
import AuthScreen from "./src/screens/Auth"
import AuthContext from "./src/context/AuthContext"
import { setTokenApi, getTokenApi, removeTokenApi } from "./src/api/token"
import { ToastProvider } from 'react-native-fast-toast'

export default function App() {

  const [auth, setAuth] = useState(undefined)

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: token,
        });
      } else {
        setAuth(null);
      }
    })()
  }, []);

  const login = (user) => {
    //console.log("LOGIN APP.JS");
    setTokenApi(user.id);
    setAuth({
      token: user.id,
      idUser: user.id
    })
  }

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <ToastProvider>
      <AuthContext.Provider value={authData}>
        <PaperProvider>
          {auth ? <AppNavigation /> : <AuthScreen />}
        </PaperProvider>
      </AuthContext.Provider>
    </ToastProvider>
  );
}
