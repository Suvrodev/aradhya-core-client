import { useState } from "react";
import { useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/Fucntion/verifyToken";
import StudentDesktopHeader from "./Shared/StudentHeader/StudentDesktopHeader/StudentDesktopHeader";
import StudentMobileHeader from "./Shared/StudentHeader/StudentMobileHeader/StudentMobileHeader";
import "./StudentDashboard.css";
import StudentDashboardData from "./StudentDashboardData/StudentDashboardData";
import StudentDashboardHome from "./StudentDashboardHome";
import { useGetSpecificStudentQuery } from "../../redux/api/features/Student/studentManagementApi";
import { TStudent } from "../../utils/types/globalTypes";
import LoadingPage from "../../Component/LoadingPage/LoadingPage";
const StudentDashboard = () => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  console.log("Fucking USer: ", user);
  const { data, isLoading } = useGetSpecificStudentQuery(user?.studentId);
  const loggedStudent: TStudent = data?.data;
  console.log("Logged Student in Student Main: ", loggedStudent);

  const [openDrawer, setOpenDrawer] = useState(false);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="userDashboardBG text-black">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <StudentDesktopHeader user={user} />
      </div>

      {/* Mobile Header */}
      <div className=" md:hidden">
        <StudentMobileHeader
          user={user}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      </div>

      <div className="">
        <div className="flex relative ">
          {/* Left Side for Desktop */}
          <div className={`hidden md:block md:w-[18%]`}>
            <StudentDashboardData loggedStudent={loggedStudent} />
          </div>

          {/* Mobile Animation */}
          <div
            className={`md:hidden absolute w-full left-0 top-0 min-h-screen bg-transparent`}
            onClick={() => setOpenDrawer(false)}
          >
            <div
              className="relative w-full z-20"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className={`absolute  w-[225px] bg-teal-500 ease-in-out duration-700 ${
                  openDrawer ? "left-0 " : "-left-[1000px]"
                } `}
              >
                <StudentDashboardData loggedStudent={loggedStudent} />
              </div>
            </div>
          </div>

          {/* Right side for Desktop and Full Side for Mobile */}
          <div className="w-full md:w-[88%]  ">
            <StudentDashboardHome loggedStudent={loggedStudent} />
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
