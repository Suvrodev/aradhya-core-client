import { useState } from "react";
import { useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/Fucntion/verifyToken";
import StudentDesktopHeader from "./Shared/StudentHeader/StudentDesktopHeader/StudentDesktopHeader";
import StudentMobileHeader from "./Shared/StudentHeader/StudentMobileHeader/StudentMobileHeader";
import "./StudentDashboard.css";
import StudentDashboardData from "./StudentDashboardData/StudentDashboardData";
import { useGetSpecificStudentQuery } from "../../redux/api/features/Student/studentManagementApi";
import { TStudent } from "../../utils/types/globalTypes";
import LoadingPage from "../../Component/LoadingPage/LoadingPage";
import { Outlet } from "react-router";
const StudentDashboard = () => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data, isLoading } = useGetSpecificStudentQuery(user?.studentId);
  const loggedStudent: TStudent = data?.data;
  // console.log("Logged Student in Student Main: ", loggedStudent);

  const [openDrawer, setOpenDrawer] = useState(false);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="userDashboardBG text-black">
      {/* Desktop Header */}
      <div className="hidden md:block ">
        <StudentDesktopHeader />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-20">
        <StudentMobileHeader
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      </div>

      <div className="">
        <div className="flex relative ">
          {/* Left Side for Desktop */}
          <div className={`hidden md:block md:w-[18%]  sticky top-0`}>
            <StudentDashboardData
              loggedStudent={loggedStudent}
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
            />
          </div>

          {/* Mobile Animation */}
          <div
            className={`md:hidden absolute w-full h-full left-0 top-0  bg-transparent z-10`}
            onClick={() => setOpenDrawer(false)}
          >
            <div
              className="relative w-full"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className={`absolute  w-[225px] bg-teal-500 ease-in-out duration-700 ${
                  openDrawer ? "left-0 " : "-left-[1000px] "
                } `}
              >
                <StudentDashboardData
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
      <div className="box1"></div>
      <div className="box2"></div>
      <div className="box3"></div>
      <div className="box4"></div>
      <div className="box5"></div>
      <div className="box6"></div>
      <div className="box7"></div>
    </div>
  );
};

export default StudentDashboard;
