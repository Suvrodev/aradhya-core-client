import { useAppSelector } from "../../../redux/hook";
import { verifyToken } from "../../../utils/Fucntion/verifyToken";
import "./InstructorDashboardHome.css";

const InstructorDashboardHome = () => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }
  console.log("User in Home: ", user);

  return <div>Instructor Home</div>;
};

export default InstructorDashboardHome;
