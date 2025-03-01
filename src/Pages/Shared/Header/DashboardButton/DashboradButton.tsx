import { Link } from "react-router";
import { useAppSelector } from "../../../../redux/hook";

const DashboradButton = () => {
  const { user } = useAppSelector((state) => state.auth);
  // console.log("User: ", user);
  const role = user?.role;
  // console.log("Role: ", role);
  return (
    // <div>
    //   <div className="dropdown ">
    //     <div
    //       tabIndex={0}
    //       role="button"
    //       className="btn text-white  bg-[#19CB7C] hover:bg-slate-600 border-none"
    //     >
    //       Dashboard
    //     </div>
    //     <ul
    //       tabIndex={0}
    //       className="dropdown-content menu  bg-green-600 rounded-md z-[1] w-32 p-0 shadow"
    //     >
    //       <li>
    //         <Link to={`/${role}-dashboard`}>Profile</Link>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    <div>
      <Link to={`/${role}-dashboard`}>
        <button className="btn btn-primary text-white">Dashboard</button>
      </Link>
    </div>
  );
};

export default DashboradButton;
