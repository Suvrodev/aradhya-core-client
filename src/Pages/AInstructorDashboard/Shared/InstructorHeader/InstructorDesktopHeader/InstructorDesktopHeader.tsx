import { Link } from "react-router";
// import headerImage from "../../../../../../assets/Logo/Header_1.png";
import fullLogo from "../../../../../assets/Logo/fullLogo.png";
import { useState } from "react";
import { useAppSelector } from "../../../../../redux/hook";
import { verifyToken } from "../../../../../utils/Fucntion/verifyToken";
import { TStudent } from "../../../../../utils/types/globalTypes";
import { useGetSpecificInstructorQuery } from "../../../../../redux/api/features/Instructor/instructorManagementApi";

const InstructorDesktopHeader = () => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data, isLoading } = useGetSpecificInstructorQuery(user?.studentId);
  const loggedStudent: TStudent = data?.data;

  const [openDashboard, setOpenDashboard] = useState(false);
  const handleDashboard = () => {
    setOpenDashboard(!openDashboard);
  };
  console.log("Open Dashboard: ", openDashboard);

  if (isLoading) {
    return <p>...</p>;
  }

  return (
    <div className="relative ">
      <div className="bg-gradient-to-br from-white via-[#F0F4FF] to-[#E6FCF5] overflow-hidden">
        <div className="flex  items-center justify-between max-w-[82rem] px-4 md:px-0 mx-auto  h-[70px]  ">
          <div className="w-1/3 flex items-center  justify-start h-full  ">
            <Link to={"/home"}>
              {" "}
              <img src={fullLogo} alt="" className="w-full md:w-4/12" />
            </Link>
          </div>

          <div className="w-2/3 flex items-center justify-end h-full  ">
            <div className="flex items-center gap-2 w-full justify-end">
              <div className="text-[16px] md:text-xl font-bold flex flex-col md:flex-row  gap-x-4">
                <span className="text-green-400 text-[14px] md:text-[20px]">
                  Welcome
                </span>{" "}
                <span
                  className="text-[#114044] cursor-pointer  text-[12px] md:text-[20px]"
                  onClick={() => {
                    handleDashboard();
                  }}
                >
                  {loggedStudent?.name}
                </span>
              </div>

              <div className=" flex items-center gap-2 relative z-10">
                <img
                  src={loggedStudent?.image}
                  alt=""
                  className="w-[35px] h-[35px] md:w-[50px]  md:h-[50px]  rounded-full cursor-pointer z-20"
                  onClick={handleDashboard}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className={`absolute w-full h-screen bg-gre  ${
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
              <img src={user?.image} alt="" />
              <Link to={"/"}></Link>
              <button
                className="btn btn-error text-white"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default InstructorDesktopHeader;
