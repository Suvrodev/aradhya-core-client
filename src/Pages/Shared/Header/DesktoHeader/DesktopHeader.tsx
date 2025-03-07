import { Link, useLocation } from "react-router";
import headerImage from "../../../../assets/Logo/logo.png";
import headerText from "../../../../assets/Logo/logoText.png";
import { headerArray } from "../../../../utils/Array/headerArray";
import { useAppSelector } from "../../../../redux/hook";
import { useDispatch } from "react-redux";
import DashboradButton from "../DashboardButton/DashboradButton";
import { logout } from "../../../../redux/api/features/auth/authSlice";
const DesktopHeader = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const path = useLocation()?.pathname;
  // console.log("Path: ", path);
  return (
    <div className={`bgColor `}>
      <div className="flex  items-center justify-between  max-w-[82rem]  mx-auto  ">
        <div className="flex items-center  justify-start w-[33%] gap-4 py-4 ">
          <Link to={"/home"}>
            {" "}
            <img src={headerImage} alt="" className="w-[50px] " />
          </Link>
          <Link to={"/home"}>
            <img src={headerText} alt="" className="w-[200px] " />
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
        <div className="  w-[33%] flex items-center justify-end">
          {token ? (
            <div className="flex items-center gap-2">
              <div className="flex flex-row-reverse items-center">
                <DashboradButton />
              </div>
              <button
                className="btn btn-error text-white"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to={"/login"}>
              {" "}
              <button className="btn btn-primary text-white ">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
