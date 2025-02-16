import { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../assets/assets";

const Login = () => {
  const [accountID, setAccountID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

 
  return (
    <div className="min-h-screen flex flex-col mt-20 justify-center items-center bg-gray-100">
      <ToastContainer />

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300 ease-in-out">
        <img
          src={assets.goldLogo}
          className="w-20 mx-auto mb-5 transition-transform duration-300 hover:scale-105"
          alt="Logo"
        />

        <h2 className="text-xl font-semibold text-center mb-4 transition-opacity duration-300">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <div className={`transition-opacity duration-300 ${isLogin ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto mb-4"}`}>
          <label className="block text-gray-600">Email</label>
          <div className="flex items-center border border-gray-300 p-2 rounded transition-all duration-300 focus-within:border-yellow-500">
            <FiMail className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Account ID</label>
          <div className="flex items-center border border-gray-300 p-2 rounded transition-all duration-300 focus-within:border-yellow-500">
            <FiUser className="text-gray-500 mr-2" />
            <input
              type="number"
              placeholder="Enter your ID"
              className="w-full outline-none"
              value={accountID}
              onChange={(e) => setAccountID(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Password</label>
          <div className="flex items-center border border-gray-300 p-2 rounded transition-all duration-300 focus-within:border-yellow-500">
            <FiLock className="text-gray-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 transition-transform duration-300 hover:scale-110"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button
          
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
           
            className="text-yellow-500 font-semibold transition-colors duration-300 hover:text-gray-800"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
