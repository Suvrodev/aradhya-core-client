import "./StudentDashboardData.css";
import { TStudent } from "../../../utils/types/globalTypes";
import studentDashboardArray from "./studentDashboardArray";
import { Link, useLocation } from "react-router";
import { X } from "lucide-react";
import LogOutButton from "../../../Component/Button/LogOutButton";

interface IProps {
  loggedStudent: TStudent;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}
const StudentDashboardData = ({
  loggedStudent,
  openDrawer,
  setOpenDrawer,
}: IProps) => {
  // console.log("Logged Student in Student Dashboard: ", loggedStudent);
  const { name, image, studentId, email, phone } = loggedStudent;

  // console.log("Open Drawer in Dashboard: ", openDrawer);

  const path = useLocation()?.pathname;

  return (
    <div className="bg-gradient-to-br from-teal-500 to-[#262F51] min-h-screen z-20 fixed top-0 md:relative shadow-xl">
      {/* Mobile Close Button */}
      <div className="relative md:hidden w-full">
        <div
          className="absolute right-4 top-4 text-white z-40 bg-[#262F51]/80 hover:bg-[#262F51] p-2 rounded-full cursor-pointer transition-all duration-300"
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <X size={20} />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="relative max-w-4xl mx-auto p-6 md:p-8 text-white flex flex-col items-center">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-2 w-full">
          <img
            src={image}
            alt="Student Profile"
            className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-teal-300/50 shadow-lg hover:border-teal-300 transition-all duration-300 object-cover"
          />
          <div className="mt-4 text-center space-y-1 w-full">
            <h1 className="font-bold text-xl text-white">{name}</h1>
            <p className="text-teal-200 text-sm">{studentId}</p>
            <p className="text-teal-200 text-sm">{email}</p>
            <p className="text-teal-200 text-sm">{phone}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-teal-300/20 my-2"></div>

        {/* Home Link */}
        <Link
          to="/"
          className="w-full py-3 px-6 mb-4 rounded-lg bg-teal-600/30 hover:bg-teal-600/50 transition-all duration-200 text-white text-center"
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          Go Home
        </Link>

        {/* Navigation Links */}
        <nav className="w-full space-y-0 mb-2">
          {studentDashboardArray.map((data, idx) => (
            <Link
              key={idx}
              to={`${data?.path}`}
              className={`block py-2 px-6 rounded-lg hover:bg-teal-600/30 transition-all duration-200 text-teal-100 hover:text-white text-center ${
                path == data?.path ? "bg-teal-600" : ""
              }`}
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              {data?.title}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="h-[1px] w-full bg-teal-300/20 my-2"></div>

        {/* Logout Button */}
        <div className="w-full mt-4 flex justify-center">
          <LogOutButton />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardData;
