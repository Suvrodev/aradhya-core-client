import { Link } from "react-router";
import headerImage from "../../../../assets/Logo/Header_1.png";
import headerText from "../../../../assets/Logo/Header_2.png";
const DesktopHeader = () => {
  return (
    <div className={`bgColor `}>
      <div className="flex  items-center justify-between  max-w-[82rem]  mx-auto bg-yellow-300">
        <div className="flex items-center  w-[33%]">
          <Link to={"/home"}>
            {" "}
            <img src={headerImage} alt="" className="w-[95px] h-[70px] " />
          </Link>
          <Link to={"/home"}>
            <img src={headerText} alt="" className="w-[200px] h-[70px]" />
          </Link>
        </div>
        <div className="flex gap-4 items-center justify-center  w-[33%]">
          <p className="text-black">Home</p>
          <p className="text-black">Home</p>
          <p className="text-black">Home</p>
        </div>
        <div className="  w-[33%] flex items-center justify-end">
          <Link to={"/login"}>
            {" "}
            <button className="btn btn-primary text-white ">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
