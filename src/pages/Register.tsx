import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/images/loginlogo.png";

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
    <div
      className="w-full relative h-[100vh] flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://media1.giphy.com/media/pOEbLRT4SwD35IELiQ/giphy.gif?cid=ecf05e47m2nnp87hhqmhen93llwyyk3biqy2c6m1kdof9l3b&ep=v1_gifs_search&rid=giphy.gif&ct=g)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="overlay w-full h-[100vh] absolute bg-black opacity-60"></div>
      <div className="logo bg-white p-[1px] rounded-full absolute top-[120px] z-30 w-[80px] h-[80px]">
        <img src={logo} alt="logo" />
      </div>
      <div className="authCard max-w-md bg-black  flex-col items-center backdrop-blur-lg text-black justify-center h-auto py-20 px-10 shadow-md rounded-md">
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
          Register
        </button>

        <h4 className="font-semibold mt-2 text-white">
          Already had an account!{" "}
          <span
            className="text-[#fe8040] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </h4>
      </div>
    </div>
  );
}

export default Register;
