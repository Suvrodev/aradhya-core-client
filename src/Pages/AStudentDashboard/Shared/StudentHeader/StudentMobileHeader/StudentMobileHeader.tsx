import fullLogo from "../../../../../assets/Logo/fullLogo.png";
import { Link } from "react-router";

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const StudentMobileHeader = ({ user, openDrawer, setOpenDrawer }: IProps) => {
  console.log("Open Drawer in Mobile Header: ", openDrawer);
  return (
    <div className=" ">
      <div className="bg-gradient-to-br from-white via-[#F0F4FF] to-[#E6FCF5] sticky top-0 overflow-hidden">
        <div className="flex  items-center justify-between px-4 md:px-0 mx-auto  h-[70px]  ">
          <div className="w-2/3 flex items-center justify-start h-full  ">
            <div
              className="flex items-center justify-start"
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <div className=" flex items-center ">
                <img
                  src={user?.image}
                  alt=""
                  className="w-[35px] h-[35px] md:w-[50px]  md:h-[50px]  rounded-full cursor-pointer z-20"
                />
              </div>

              <div className="text-[16px] md:text-xl font-bold flex flex-col md:flex-row  gap-x-4">
                <span className="text-green-400 text-[14px] md:text-[20px]">
                  Welcome
                </span>{" "}
                <span
                  className="text-[#114044] cursor-pointer  text-[12px] md:text-[20px]"
                  onClick={() => {}}
                >
                  {user?.name}
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

export default StudentMobileHeader;
