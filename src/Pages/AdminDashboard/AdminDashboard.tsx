import MenuIcon from "@mui/icons-material/Menu";
import WestIcon from "@mui/icons-material/West";
import { useTitle } from "../../Component/hook/useTitle";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Link, Outlet, useLocation } from "react-router";
import { adminDashboards } from "../../utils/Array/adminDashboard";
import { logout } from "../../redux/api/features/auth/authSlice";
import {
  FaUser,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";

const AdminDashboard = () => {
  useTitle("Admin Dashboard");
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation()?.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-5 flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:relative sm:translate-x-0`}
      >
        <button
          className="absolute top-4 right-4 text-white sm:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-lg font-bold mb-5">Admin Dashboard</h2>
        <nav className="flex-1">
          <ul>
            <li className="mb-3 bg-blue-600 p-2 rounded">Dashboard Home</li>
            <li className="mb-3 p-2 hover:bg-gray-700 rounded">My Profile</li>
            <li className="mb-3 p-2 hover:bg-gray-700 rounded">Add Book</li>
            <li className="mb-3 p-2 hover:bg-gray-700 rounded">
              Book Management
            </li>
            <li className="mb-3 p-2 hover:bg-gray-700 rounded">
              User Management
            </li>
            <li className="mb-3 p-2 hover:bg-gray-700 rounded">
              Order Management
            </li>
          </ul>
        </nav>
        <button className="bg-red-600 p-2 rounded flex items-center justify-center">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 sm:pl-72">
        {/* Mobile menu button */}
        <button
          className="sm:hidden mb-5 text-white"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars size={24} />
        </button>
        <h1 className="text-3xl font-bold text-teal-400">Admin Dashboard</h1>
        <p className="text-gray-400">
          Manage Boundless Reads Book Shop with ease and efficiency.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          <div className="bg-gray-800 p-5 rounded flex items-center space-x-3">
            <FaUser className="text-teal-400 text-2xl" />
            <span className="text-lg font-semibold">User Profile</span>
          </div>
          <div className="bg-gray-800 p-5 rounded flex items-center space-x-3">
            <FaBook className="text-green-400 text-2xl" />
            <span className="text-lg font-semibold">Add Book</span>
          </div>
          <div className="bg-gray-800 p-5 rounded flex items-center space-x-3">
            <FaClipboardList className="text-blue-400 text-2xl" />
            <span className="text-lg font-semibold">Books Management</span>
          </div>
          <div className="bg-gray-800 p-5 rounded flex items-center space-x-3">
            <FaUsers className="text-purple-400 text-2xl" />
            <span className="text-lg font-semibold">User Management</span>
          </div>
          <div className="bg-gray-800 p-5 rounded flex items-center space-x-3">
            <FaClipboardList className="text-yellow-400 text-2xl" />
            <span className="text-lg font-semibold">Order Management</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
