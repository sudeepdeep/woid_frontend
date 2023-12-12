import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function Login() {
  const existingUserCheck = Cookies.get("token");

  useEffect(() => {
    if (existingUserCheck) {
      navigate("/");
    }
  }, [existingUserCheck]);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        if (res.data.access_token) {
          console.log(res, "res");
          Cookies.set("token", res.data.access_token);
          Cookies.set("userId", res.data.userId);
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }
  return (
    <div className="w-full h-[100vh] flex items-center text-black justify-center">
      <div className="authCard h-[50vh] p-6 bg-black shadow-md rounded-md">
        <input
          type="text"
          className="w-full resize-none rounded-sm bg-[#b4c2ed] p-3 mb-2 text-black"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full resize-none rounded-sm bg-[#b4c2ed] p-3 mb-2 text-white"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-[200px] h-[40px] rounded-sm shadow-md overflow-hidden bg-[#fe8040] uppercase font-semibold tracking-widest text-md"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
