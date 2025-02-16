import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin
      ? "http://localhost:5000/api/users/login"
      : "http://localhost:5000/api/users/register";
    const payload = isLogin
      ? { email, password }
      : { accountID, email, password };

    try {
      console.log("Sending request to:", url);
      console.log("Payload:", payload);

      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", response.data);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);

      // Redirect user to home page after successful login
      if (isLogin) {
        setTimeout(() => navigate("/"), 2000); // Redirect after showing success toast
      }
    } catch (error) {
      console.error("Error:", error.response || error.message);
      toast.error(
        error.response?.data?.message || "An error occurred. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

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

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-600">Account ID</label>
              <div className="flex items-center border border-gray-300 p-2 rounded focus-within:border-yellow-500">
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
          )}

          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <div className="flex items-center border border-gray-300 p-2 rounded focus-within:border-yellow-500">
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
            <label className="block text-gray-600">Password</label>
            <div className="flex items-center border border-gray-300 p-2 rounded focus-within:border-yellow-500">
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
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-500 text-white py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
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
