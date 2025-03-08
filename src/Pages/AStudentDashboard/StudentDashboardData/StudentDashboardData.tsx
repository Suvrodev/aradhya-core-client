import "./StudentDashboardData.css";
import { TStudent } from "../../../utils/types/globalTypes";
import studentDashboardArray from "./studentDashboardArray";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/api/features/auth/authSlice";
import { X } from "lucide-react";

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
  const dispatch = useDispatch();
  // console.log("Logged Student in Student Dashboard: ", loggedStudent);
  const { name, image, studentId, email, phone } = loggedStudent;

  // console.log("Open Drawer in Dashboard: ", openDrawer);
  return (
    <div className="bg-gradient-to-br from-[#A6E3E9] via-[#4A9BA9] to-[#1A4A54] min-h-screen  z-20  fixed top-0 md:relative">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#A6E3E9]/20 via-[#4A9BA9]/20 to-[#1A4A54]/20 blur-2xl"></div> */}

      {/* <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div> */}
      <div className="relative md:hidden w-full  ">
        <div
          className="absolute right-4 top-4 text-white z-40"
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <X />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto p-8 text-white flex flex-col items-center justify-center gap-y-0 ">
        <img
          src={image}
          alt=""
          className="w-[75px] h-[75px]  md:w-[125px] md:h-[125px] rounded-full border-white"
        />
        <h1 className="font-bold mt-4 text-[#c9c3cf]">{studentId}</h1>
        <h1 className="font-bold  text-[#c9c3cf]">{name}</h1>
        <h1 className="font-bold  text-[#c9c3cf]">{email}</h1>
        <h1 className="font-bold  text-[#c9c3cf]">{phone}</h1>
        <div className="hudaiBorder my-4"></div>
        <div className="flex flex-col items-start gap-2 w-full">
          {studentDashboardArray.map((data, idx) => (
            <Link
              key={idx}
              to={`${data?.path}`}
              className="relative left-4"
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              {" "}
              {data?.title}
            </Link>
          ))}
        </div>
        <div className="flex justify-start w-full mt-4">
          <button
            className="btn btn-error text-white relative left-4 "
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardData;
