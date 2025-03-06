import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";
import DesktopHeader from "../Pages/Shared/Header/DesktoHeader/DesktopHeader";
import MobileHeader from "../Pages/Shared/Header/MobileHeader/MobileHeader";

const Main = () => {
  return (
    <div>
      <div className="hidden md:block  sticky top-0 z-10">
        <DesktopHeader />
      </div>
      <div className=" md:hidden sticky top-0 z-10">
        <MobileHeader />
      </div>
      <div className="  ">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
