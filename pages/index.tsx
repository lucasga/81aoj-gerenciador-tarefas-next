import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Login } from "../containers/Login";
import { Home } from "../containers/Home";
import { Register } from "../containers/Register";

const Index: NextPage = () => {
  const [accessToken, setToken] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const returnPageShouldRender = () => {
    if (accessToken) {
      return <Home setToken={setToken} />;
    } else if (isRegister) {
      return <Register setIsRegister={setIsRegister} />;
    }

    return <Login setToken={setToken} setIsRegister={setIsRegister} />;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setToken(token);
      }
    }
  }, []);

  return returnPageShouldRender();
};

export default Index;
