import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Register() {
  const navigate = useNavigate();
  const existingUser = Cookies.get("token");
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    if (existingUser) {
      Cookies.remove("token");
    }
  }, [existingUser]);

  function handleRegister() {
    axios
      .post("/user", {
        username: userData.username,
        password: userData.password,
        email: userData.email,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="w-full h-[100vh] flex items-center text-black justify-center">
      <div className="authCard h-[50vh] p-6 bg-black shadow-md rounded-md">
        <input
          type="text"
          className="w-full resize-none rounded-sm bg-[#b4c2ed] p-3 mb-2 text-black"
          placeholder="Enter Username"
          onChange={(e) =>
            setUserData({
              ...userData,
              username: e.target.value,
            })
          }
        />
        <input
          type="email"
          className="w-full resize-none rounded-sm bg-[#b4c2ed] p-3 mb-2 text-white"
          placeholder="Enter Email"
          onChange={(e) =>
            setUserData({
              ...userData,
              email: e.target.value,
            })
          }
        />
        <input
          type="password"
          className="w-full resize-none rounded-sm bg-[#b4c2ed] p-3 mb-2 text-white"
          placeholder="Enter Password"
          onChange={(e) =>
            setUserData({
              ...userData,
              password: e.target.value,
            })
          }
        />
        <button
          onClick={handleRegister}
          className="w-[200px] h-[40px] rounded-sm shadow-md overflow-hidden bg-[#fe8040] uppercase font-semibold tracking-widest text-md"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;
