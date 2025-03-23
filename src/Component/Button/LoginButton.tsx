const LoginButton = () => {
  return (
    <button className="shadow-black shadow-sm relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-br from-teal-500 to-[#262F51] rounded-lg group">
      {/* Button Text */}
      <span className="relative z-10 text-lg font-semibold">Login</span>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#262F51] to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Shine Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Ripple Effect */}
      <span className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ripple"></span>
    </button>
  );
};

export default LoginButton;
