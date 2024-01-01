import Cookies from "js-cookie";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/images/loginlogo.png";
import bgImg from "../assets/images/lottie-bg.json";
import axios from "../services/axios";

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
        toast.error("some thing went wrong.");
      });
  }
  return (
    <div className="w-full min-h-[100vh] h-auto flex flex-col-reverse items-center justify-between bg-black">
      <Lottie animationData={bgImg} loop={true} autoplay={true} />
      <div className="authCard max-w-md  flex-col items-center text-black justify-center h-auto py-20 px-10 shadow-md rounded-md">
        <input
          type="text"
          className="w-full resize-none rounded-sm bg-[#b4c2ed] p-3 mb-2 text-black"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full resize-none rounded-sm bg-[#b4c2ed] p-3 mb-2 text-black"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-[200px] h-[40px] rounded-sm shadow-md overflow-hidden bg-[#fe8040] uppercase font-semibold tracking-widest text-md"
        >
          Login
        </button>
        <h4 className="font-semibold mt-2 text-white">
          New to Woid!{" "}
          <span
            className="text-[#fe8040] cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Create Account
          </span>
        </h4>
      </div>

      <div className="logo w-[80px] pt-6 h-[80px]">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default Login;
