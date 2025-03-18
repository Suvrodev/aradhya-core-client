import { LayoutDashboard } from "lucide-react"; // Import the dashboard icon from Lucide React

const DashboardButton = () => {
  return (
    <button className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-br from-indigo-600 to-purple-800 rounded-lg group">
      {/* Button Text and Icon */}
      <span className="relative z-10 flex items-center gap-2 text-lg font-semibold">
        <LayoutDashboard className="w-5 h-5" /> {/* Dashboard Icon */}
        Dashboard
      </span>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Shine Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Ripple Effect */}
      <span className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ripple"></span>
    </button>
  );
};

export default DashboardButton;
