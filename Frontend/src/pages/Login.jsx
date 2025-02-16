import { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../assets/assets";

const Login= () => {
  const [accountID, setAccountID] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true); 

  const handleLogin = () => {
    toast.success("Login Successful");
  };

  const handleSignup = () => {
    toast.success("Signup Successful");
  };

  return (
    <div className="h-screen flex justify-center mt-30 items-center bg-gray-100">
      <ToastContainer />
      
      <div className="bg-white p-8 rounded-lg  shadow-lg w-96">
        <img src={assets.goldLogo} className="w-20 mx-auto mb-5" alt="Logo" />

        <h2 className="text-xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <div className="flex items-center border border-gray-300 p-2 rounded">
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
        )}

        <div className="mb-4">
          <label className="block text-gray-600">Account ID</label>
          <div className="flex items-center border border-gray-300 p-2 rounded">
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
          <div className="flex items-center border border-gray-300 p-2 rounded">
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
              className="text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button
          onClick={isLogin ? handleLogin : handleSignup}
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-500 font-semibold"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
