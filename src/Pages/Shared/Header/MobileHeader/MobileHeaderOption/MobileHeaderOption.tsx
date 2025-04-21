import { Link, useLocation } from "react-router";
import { useAppSelector } from "../../../../../redux/hook";
import DashboradButton from "../../DashboardButton/DashboradButton";
import { headerArray } from "../../../../../utils/Array/headerArray";
import LoginButton from "../../../../../Component/Button/LoginButton";
import LogOutButton from "../../../../../Component/Button/LogOutButton";
// import LogOutButton from "../../../../../Component/Button/LogOutButton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MobileHeaderOption = ({ handleClick }: any) => {
  const { token } = useAppSelector((state) => state.auth);
  const path = useLocation()?.pathname;

  return (
    <div className="bg-gradient-to-br from-teal-500 to-[#262F51] backdrop-blur-sm bg-white/10 text-white flex flex-col gap-4 px-5 py-5 relative z-10 shadow-2xl">
      {/* Navigation Links */}
      <div className="flex flex-col gap-4 font-bold w-full">
        {headerArray.map((data, idx) => (
          <Link
            to={`${data?.path}`}
            key={idx}
            onClick={() => handleClick(false)}
            className={`text-lg font-semibold cursor-pointer transition-all duration-300 hover:text-teal-300 ${
              data?.path === path ? "text-teal-300" : "text-white"
            }`}
          >
            {data?.text}
          </Link>
        ))}
      </div>

      {/* Login/Logout Section */}
      <div className="w-full flex justify-start items-center">
        {token ? (
          <div className="flex flex-col items-start gap-4">
            {/* Dashboard Button */}
            <div className="flex flex-row-reverse items-center">
              <DashboradButton />
            </div>

            {/* Logout Button */}
            <LogOutButton />
          </div>
        ) : (
          <Link to={"/login"}>
            <LoginButton />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileHeaderOption;
