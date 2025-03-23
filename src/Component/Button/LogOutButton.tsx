import { LogOut } from "lucide-react"; // Import the logout icon from Lucide React
import { useDispatch } from "react-redux";
import { logout } from "../../redux/api/features/auth/authSlice";

const LogOutButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(logout())}
      className="shadow-black shadow-sm relative inline-flex items-center justify-center px-4 py-3 overflow-hidden font-medium text-white bg-gradient-to-br from-red-600 to-red-800 rounded-lg group"
    >
      {/* Button Text and Icon */}
      <span className="relative z-10 flex items-center gap-2 text-lg font-semibold">
        <LogOut className="w-5 h-5" /> {/* Logout Icon */}
        Logout
      </span>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-800 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Shine Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Ripple Effect */}
      <span className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ripple"></span>
    </button>
  );
};

export default LogOutButton;
