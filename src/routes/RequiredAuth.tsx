import { useState, useEffect } from "react";
import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import Sign from "../components/Sign";
const RequiredAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("hahaha");
  useEffect(() => {
    const publicKey = localStorage.getItem("publicKey");
    const auth = publicKey ? true : false;
    console.log(auth);
    if (auth && location.pathname === "/") {
      navigate("/home");
    }
    setAuthenticated(auth);
  }, [location.pathname, navigate]);

  return authenticated ? (
    <Outlet />
  ) : location.pathname === "/" ? (
    <Sign />
  ) : (
    navigate("/")
  );
};

export default RequiredAuth;
