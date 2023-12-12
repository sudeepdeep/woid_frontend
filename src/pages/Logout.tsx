import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const checkToken = Cookies.get("token");
  useEffect(() => {
    if (checkToken) {
      Cookies.remove("token");
      Cookies.remove("userId");
    }
    navigate("/login");
  }, [checkToken]);
  return (
    <div className="bg-black flex text-white items-center justify-center font-semibold tracking-wide">
      Logging out.. please wait
    </div>
  );
}

export default Logout;
