
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../assets/assets";

const Login = () => {
  const [accountID, setAccountID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);




  

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer /> 
      
      <div className="bg-white p-8 rounded-lg mt-10 shadow-lg w-96">
        <img src={assets.goldLogo} className="w-20 mx-auto mb-5" alt="" />

        <div className="mb-4">
          <label className="block text-gray-600">Account ID</label>
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <FiUser className="text-gray-500 mr-2" />
            <input
              type="text"
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
          onClick={handleLogin}
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
