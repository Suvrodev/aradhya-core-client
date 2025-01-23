import { Outlet } from "react-router";
import DesktopHeader from "../Pages/Shared/Header/DesktopHeader";

const Main = () => {
  return (
    <div>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
      <div className=" md:hidden">
        <DesktopHeader />
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
