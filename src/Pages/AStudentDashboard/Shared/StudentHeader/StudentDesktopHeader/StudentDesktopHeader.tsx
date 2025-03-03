import "./StudentDesktopHeader.css";
import { Link, useLocation } from "react-router";
import { headerArray } from "../../../../../utils/Array/headerArray";
// import headerImage from "../../../../../../assets/Logo/Header_1.png";
import headerImage from "../../../../../assets/Logo/Header_1.png";
import headerText from "../../../../../assets/Logo/Header_2.png";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../redux/hook";
import { logout } from "../../../../../redux/api/features/auth/authSlice";
import { verifyToken } from "../../../../../utils/Fucntion/verifyToken";
import loggedUserDefaultImage from "../../../../../assets/loggedUser/loggedUser.png";
import { useState } from "react";
const StudentDesktopHeader = () => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }
  //   console.log("User in Student Header: ", user);
  const dispatch = useDispatch();
  const path = useLocation()?.pathname;

  const [openDashboard, setOpenDashboard] = useState(false);
  const handleDashboard = () => {
    setOpenDashboard(!openDashboard);
  };
  // console.log("Open Dashboard: ", openDashboard);

  return (
    <div className="relative ">
      <div className="bg-gradient-to-br from-white via-[#F0F4FF] to-[#E6FCF5] overflow-hidden">
        <div className="flex  items-center justify-between max-w-[82rem]  mx-auto   ">
          <div className="flex items-center  w-[33%]">
            <Link to={"/home"}>
              {" "}
              <img src={headerImage} alt="" className="w-[95px] h-[70px] " />
            </Link>
            <Link to={"/home"}>
              <img src={headerText} alt="" className="w-[200px] h-[70px]" />
            </Link>
          </div>
          <div className="flex gap-4 items-center justify-center  w-[33%]">
            {headerArray.map((data, idx) => (
              <Link
                to={`${data?.path}`}
                key={idx}
                className={`text-black font-bold cursor-pointer ${
                  data?.path == path ? "text-blue-500" : ""
                }`}
              >
                {data?.text}
              </Link>
            ))}
          </div>

          <div className="  w-[33%] flex items-center justify-end   ">
            <div className="flex items-center gap-2 w-full justify-end">
              <div className="">
                <div className="text-xl font-bold">
                  <span className="text-green-400 ">Welcome</span>{" "}
                  <span
                    className="text-[#114044] cursor-pointer "
                    onClick={() => {
                      handleDashboard();
                    }}
                  >
                    {user?.name ? user.name : "Guest"}
                  </span>
                </div>
              </div>

              <div className=" flex items-center gap-2 relative z-10">
                <img
                  src={user?.image ? user.image : loggedUserDefaultImage}
                  alt=""
                  className="h-[60px] w-full rounded-full cursor-pointer z-20"
                  onClick={handleDashboard}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute w-full h-screen bg-transparent  ${
          openDashboard ? "" : "hidden"
        }`}
        onClick={() => setOpenDashboard(false)}
      >
        <div className="relative">
          <div
            className="absolute w-[300px] h-[450px] bg-purple-500 top-2 right-10 rounded-lg flex flex-col items-start z-20"
            onClick={(e) => {
              e.stopPropagation(); // Prevents the click from reaching the parent
              setOpenDashboard(true);
            }}
          >
            <div className="flex justify-center w-full">
              <button
                className="btn btn-error text-white"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDesktopHeader;
