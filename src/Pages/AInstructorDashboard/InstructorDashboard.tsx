import { useState } from "react";
import { useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/Fucntion/verifyToken";
import "./InstructorDashboard.css";
import { TStudent } from "../../utils/types/globalTypes";
import LoadingPage from "../../Component/LoadingPage/LoadingPage";
import { Outlet } from "react-router";
import InstructorDesktopHeader from "./Shared/InstructorHeader/InstructorDesktopHeader/InstructorDesktopHeader";
import InstructorMobileHeader from "./Shared/InstructorHeader/InstructorMobileHeader/InstructorMobileHeader";
import InstructorDashboardData from "./InstructorDashboardData/InstructorDashboardData";
import { useGetSpecificInstructorQuery } from "../../redux/api/features/Instructor/instructorManagementApi";
const InstructorDashboard = () => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }
  // console.log("User in Instructor Dashboard: ", user);

  const { data, isLoading } = useGetSpecificInstructorQuery(user?.studentId);
  const loggedStudent: TStudent = data?.data;
  // console.log("Logged Student in Student Main(fetch): ", loggedStudent);

  const [openDrawer, setOpenDrawer] = useState(false);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="userDashboardBG text-black">
      {/* Desktop Header */}
      <div className="hidden md:block ">
        <InstructorDesktopHeader />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-20">
        <InstructorMobileHeader
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      </div>

      <div className="">
        <div className="flex relative ">
          {/* Left Side for Desktop */}
          <div className={`hidden md:block md:w-[18%]  sticky top-0`}>
            <InstructorDashboardData
              loggedStudent={loggedStudent}
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
            />
          </div>

          {/* Mobile Animation */}
          <div
            className={`md:hidden absolute w-full h-full left-0 top-0  ${
              openDrawer ? "bg-green-400 z-10" : ""
            }`}
            onClick={() => setOpenDrawer(false)}
          >
            <div
              className="relative w-full"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className={`absolute  widthBarao  ease-in-out duration-700 ${
                  openDrawer ? "left-0 " : "-left-[1000px] "
                } `}
              >
                <InstructorDashboardData
                  loggedStudent={loggedStudent}
                  openDrawer={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                />
              </div>
            </div>
          </div>

          {/* Right side for Desktop and Full Side for Mobile */}
          <div className="w-full md:w-[88%]  ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
