import { useDispatch } from "react-redux";
import { logout } from "../../redux/api/features/auth/authSlice";

export const HandleLogout = () => {
  const dispatch = useDispatch();
  dispatch(logout());

  return;
};
