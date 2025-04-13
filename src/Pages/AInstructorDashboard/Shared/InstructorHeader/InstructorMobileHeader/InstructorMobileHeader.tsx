import fullLogo from "../../../../../assets/Logo/fullLogo.png";
import { Link } from "react-router";
import { useAppSelector } from "../../../../../redux/hook";
import { verifyToken } from "../../../../../utils/Fucntion/verifyToken";
import { TStudent } from "../../../../../utils/types/globalTypes";
import { Menu } from "lucide-react";
import { useGetSpecificInstructorQuery } from "../../../../../redux/api/features/Instructor/instructorManagementApi";

interface IProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstructorMobileHeader = ({ openDrawer, setOpenDrawer }: IProps) => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data, isLoading } = useGetSpecificInstructorQuery(user?.studentId);
  const loggedStudent: TStudent = data?.data;

  // console.log("Open Dashboard in Mobile Header: ", openDrawer);

  if (isLoading) {
    return <p>...</p>;
  }

  return (
    <div className=" ">
      <div className="bg-gradient-to-br from-white via-[#F0F4FF] to-[#E6FCF5] sticky top-0 overflow-hidden">
        <div className="flex  items-center justify-between px-4 md:px-0 mx-auto  h-[70px]  ">
          <div className="w-2/3 flex items-center justify-start h-full  ">
            <div
              className="flex items-center justify-start gap-x-2"
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <div className=" flex items-center relative ">
                <img
                  src={loggedStudent?.image}
                  alt=""
                  className="w-[35px] h-[35px] md:w-[50px]  md:h-[50px]  rounded-full cursor-pointer z-20"
                />
                <div className="absolute bottom-0 right-0 z-20 bg-teal-500 p-1 rounded-full">
                  <Menu className="size-2 text-white" />
                </div>
              </div>

              <div className="text-[16px] md:text-xl font-bold flex flex-col md:flex-row  gap-x-4">
                <span className="text-green-400 text-[14px] md:text-[20px]">
                  Welcome
                </span>{" "}
                <span
                  className="text-[#114044] cursor-pointer  text-[12px] md:text-[20px]"
                  onClick={() => {}}
                >
                  {loggedStudent?.name}
                </span>
              </div>
            </div>
          </div>

          <div className="w-1/3 flex items-center  justify-start h-full">
            <Link to={"/student-dashboard"}>
              {" "}
              <img src={fullLogo} alt="" className="w-full md:w-4/12" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorMobileHeader;
