import { Outlet } from "react-router";
import DesktopHeader from "../Pages/Shared/Header/DesktopHeader";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
      <div className=" md:hidden">
        <DesktopHeader />
      </div>
      <div className="max-w-6xl mx-auto px-10">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
