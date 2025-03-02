import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router";
import { useAppSelector } from "../../../../../redux/hook";
import DashboradButton from "../../DashboardButton/DashboradButton";
import { logout } from "../../../../../redux/api/features/auth/authSlice";
import { headerArray } from "../../../../../utils/Array/headerArray";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MobileHeaderOption = ({ handleClick }: any) => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const path = useLocation()?.pathname;

  return (
    <div className="bg-gradient-to-r from-purple-700 via-indigo-800 to-purple-900 text-white flex flex-col gap-4 px-5 py-5 relative z-10">
      <div className="flex flex-col gap-4 font-bold w-full ">
        {headerArray.map((data, idx) => (
          <Link
            to={`${data?.path}`}
            key={idx}
            onClick={() => handleClick(false)}
            className={`text-black font-bold cursor-pointer ${
              data?.path == path ? "text-blue-500" : "text-white"
            }`}
          >
            {data?.text}
          </Link>
        ))}

        <div className="w-full  flex justify-start items-center 0">
          {token ? (
            <div className=" flex flex-col items-start gap-x-3">
              <div className="flex flex-row-reverse items-center">
                <DashboradButton />
              </div>
              <button
                className=" btn btn-error text-white mt-3"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className=" btn btn-primary text-white ">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileHeaderOption;
