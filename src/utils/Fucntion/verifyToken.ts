import { jwtDecode } from "jwt-decode";
import { TStudent } from "../types/globalTypes";

export const verifyToken = (token: string): TStudent => {
  return jwtDecode(token);
};
