import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../redux/hook";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { verifyToken } from "../../utils/Fucntion/verifyToken";
import { logout } from "../../redux/api/features/auth/authSlice";

interface IProps {
  children: ReactNode;
}
const InstructorProtectedRoute = ({ children }: IProps) => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log("Token in Student Protected Route: ", token);

  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }
  // console.log("By Breaking Token of user-instructor: ", user);

  useEffect(() => {
    if (!token || user?.role !== "instructor") {
      dispatch(logout());
    }
  }, [token, user?.role, dispatch]);

  if (!token) {
    return (
      <Navigate
        to={"/instructor-log"}
        state={{ from: location }}
        replace={true}
      ></Navigate>
    );
  }
  if (user?.role !== "instructor") {
    return (
      <Navigate
        to={"/login"}
        state={{ from: location }}
        replace={true}
      ></Navigate>
    );
  }
  if (user?.status !== "enable") {
    return (
      <Navigate
        to={"/login"}
        state={{ from: location }}
        replace={true}
      ></Navigate>
    );
  }
  return children;
};

export default InstructorProtectedRoute;
