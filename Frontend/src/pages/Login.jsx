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
    
    const payload = isLogin
      ? { accountID, password } 
      : { email, password };      

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
        toast.info(`Your Account ID has been sent to ${email}`);
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
          {!isLogin ? (
           
            <>
              <div className="mb-4">
                <label className="block text-gray-600">Email</label>
                <div className="flex items-center border p-2 rounded">
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
            </>
          ) : (
         
            <>
              <div className="mb-4">
                <label className="block text-gray-600">Account ID</label>
                <div className="flex items-center border p-2 rounded">
                  <FiUser className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter your Account ID"
                    className="w-full outline-none"
                    value={accountID}
                    onChange={(e) => setAccountID(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <div className="flex items-center border p-2 rounded">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-2 rounded"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-yellow-500 font-semibold">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
