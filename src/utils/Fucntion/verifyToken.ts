import { jwtDecode } from "jwt-decode";
import { TUser } from "../types/globalTypes";

export const verifyToken = (token: string): TUser => {
  return jwtDecode(token);
};
