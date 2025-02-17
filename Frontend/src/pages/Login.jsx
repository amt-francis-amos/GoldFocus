import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
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
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const url = isLogin
      ? "https://goldfocus-backend.onrender.com/api/users/login"
      : "https://goldfocus-backend.onrender.com/api/users/register";
    
    const payload = isLogin ? { accountID, password } : { email, password };
  
    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
  
      toast.success(response.data.message);
  
      if (isLogin) {
        localStorage.setItem("user", "true");
        localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event("storage")); 
        setTimeout(() => navigate("/"), 2000);
      } else {
        setTimeout(() => {
          setIsLogin(true);
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-20 justify-center items-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <img src={assets.goldLogo} className="w-20 mx-auto mb-5" alt="Logo" />

        <h2 className="text-xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-600">Email</label>
              <div className="flex items-center border border-gray-300 p-2 rounded">
                <FiMail className="text-gray-500 mr-2" />
                <input type="email" className="w-full outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="mb-4">
              <label className="block text-gray-600">Account ID</label>
              <input type="number" className="w-full p-2 border rounded" value={accountID} onChange={(e) => setAccountID(e.target.value)} />
            </div>
          )}

          <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-lg">{loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
