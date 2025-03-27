import { Link } from "react-router";
import { useAppSelector } from "../../../../redux/hook";
import { LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

const DashboardButton = () => {
  const { user } = useAppSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div>
      <Link to={`/${role}-dashboard`}>
        <motion.button
          className="relative inline-flex items-center justify-center px-6 py-2.5 md:px-8 md:py-3 overflow-hidden font-medium text-white bg-gradient-to-br from-teal-500 to-[#262F51] rounded-lg group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Button Text and Icon */}
          <span className="relative z-10 flex items-center gap-2 text-sm md:text-base font-semibold">
            <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />
            Dashboard
          </span>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#262F51] to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Shine Effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Ripple Effect */}
          <span className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ripple"></span>
        </motion.button>
      </Link>
    </div>
  );
};

export default DashboardButton;
