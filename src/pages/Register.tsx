import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Lottie from "lottie-react";
import logo from "../assets/images/loginlogo.png";
import bgImg from "../assets/images/register.json";

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
        navigate("/success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="w-full min-h-[100vh] h-auto flex flex-col-reverse items-center justify-between bg-black">
        <Lottie animationData={bgImg} loop={true} autoplay={true} />
        <div className="authCard max-w-md  flex-col items-center text-black justify-center h-auto py-20 px-10 shadow-md rounded-md">
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

        <div className="logo w-[80px] pt-16 h-[80px]">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </>
  );
}

export default Register;
