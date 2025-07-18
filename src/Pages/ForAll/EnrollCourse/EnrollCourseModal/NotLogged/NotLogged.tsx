import { Link } from "react-router";
import GoogleLoginn from "../../../../../Component/GoogleLoginn/GoogleLoginn";

const NotLogged = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[450px] bg-gradient-to-br from-teal-500 to-[#262F51] rounded-xl p-8 shadow-2xl relative overflow-hidden">
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

      {/* Ripple Animation */}
      <div className="absolute inset-0 animate-ripple">
        <div className="absolute w-20 h-20 bg-white/20 rounded-full transform scale-0 animate-ripple-inner"></div>
      </div>

      {/* Text */}
      <h2 className="text-3xl font-bold text-white mb-6 relative z-10">
        Please Login First
      </h2>

      {/* Login Button */}
      <Link
        to="/login"
        className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-br from-purple-600 to-pink-500 rounded-full group transition-all transform hover:scale-105"
      >
        <span className="relative z-10 text-lg font-semibold">Login Page</span>

        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      {/* Separator & Google Login */}
      <div className="my-6 w-full max-w-xs">
        <div className="flex items-center gap-4">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="text-sm text-gray-200 whitespace-nowrap">
            Or login with Google
          </span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>

        <div className="mt-4 flex justify-center">
          {/* 👇 Insert your Google login component here */}
          <GoogleLoginn />
        </div>
      </div>
    </div>
  );
};

export default NotLogged;
