import { useLocation } from "react-router";
import headerImage from "../../../assets/Logo/Header_1.png";
import headerText from "../../../assets/Logo/Header_2.png";
import { useEffect, useState } from "react";
const DesktopHeader = () => {
  const path = useLocation()?.pathname;
  const [remove, setRemove] = useState(false);
  useEffect(() => {
    if (path === "/pritom") {
      setRemove(true);
    }
  }, [path]);
  console.log("Remove: ", remove);
  return (
    <div
      className={`bgColor flex  items-center justify-between px-10 ${
        remove ? "hidden" : "block"
      }`}
    >
      <div className="flex items-center  w-[33%]">
        <img src={headerImage} alt="" className="w-[95px] h-[80px] " />
        <img src={headerText} alt="" className="w-[200px] h-[90px]" />
      </div>
      <div className="flex gap-4 items-center justify-center  w-[33%]">
        <p className="text-black">Home</p>
        <p className="text-black">Home</p>
        <p className="text-black">Home</p>
      </div>
      <div className="  w-[33%] flex items-center justify-end">
        <button className="btn btn-primary text-white ">Login</button>
      </div>
    </div>
  );
};

export default DesktopHeader;
