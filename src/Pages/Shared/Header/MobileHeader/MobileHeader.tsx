import "./MobileHeader.css";
import logo from "../../../../assets/Logo/Header_1.png";
import { useState } from "react";
import MobileHeaderOption from "./MobileHeaderOption/MobileHeaderOption";
import fullLogo from "../../../../assets/Logo/fullLogo.png";
import { Link } from "react-router";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <div className="  w-full  flex justify-between items-center py-2 px-5 bgColor relative z-20">
        <div className="flex items-center justify-start gap-x-2  h-[50px]">
          {/* <img src={logo} alt="" className=" w-[50px] h-[50px] rounded-full" />
          <h1 className="font-bold">Boundless Reads</h1> */}
          <Link to={"/"}>
            <img src={fullLogo} alt="" className="w-[150px] " />
          </Link>
        </div>
        <div className="">
          <div
            className={`menu-icon ${isOpen ? "open" : ""}`}
            onClick={handleClick}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div
        className={`absolute  w-full transition-all duration-700 ${
          // isOpen ? "top-[66px] left-0" : "-top-[400px] "
          isOpen ? "top-[66px] right-0" : "top-[66px]  right-[400px]"
        }`}
      >
        <MobileHeaderOption handleClick={handleClick} />
      </div>
    </div>
  );
};

export default MobileHeader;
