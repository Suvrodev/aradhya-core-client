import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useGoogleRegistrationMutation } from "../../redux/api/features/auth/authApi";
import { toast } from "sonner";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { useAppDispatch } from "../../redux/hook";
import { useLocation, useNavigate } from "react-router";
import { TStudent } from "../../utils/types/globalTypes";
import { verifyToken } from "../../utils/Fucntion/verifyToken";
import { setUser } from "../../redux/api/features/auth/authSlice";

type GoogleUser = {
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
};

type ToDBUSer = {
  name: string;
  email: string;
  picture: string;
};

const GoogleLoginn = () => {
  const dispatch = useAppDispatch();
  const [addUser] = useGoogleRegistrationMutation();
  const [googleUser, setGoogleUser] = useState<ToDBUSer | null>(null);

  const path = useLocation()?.pathname;
  console.log("Path: ", path);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: GoogleUser = jwtDecode(credentialResponse.credential);
      console.log("Decoded JWT:", decoded);
      const { given_name, family_name, email, picture } = decoded;
      const name = given_name + " " + family_name;
      setGoogleUser({ name, email, picture });
    }
  };

  useEffect(() => {
    if (googleUser) {
      console.log("Google User: ", googleUser);
      const createUser = async () => {
        toast.loading("Logining...", { id: sonarId });
        const res = await addUser(googleUser).unwrap();
        console.log("Res: ", res);
        if (res?.success) {
          console.log("--------------");
          const token = res?.data;
          const loggedUser: TStudent = verifyToken(token);
          console.log("Logged User: ", loggedUser);
          toast.success("Login Successfully", { id: sonarId });
          dispatch(setUser({ user: loggedUser, token }));
          if (path === "/login") {
            navigate(`/${loggedUser?.role}-dashboard`);
          }
        }
      };

      createUser();
    }
  }, [googleUser, addUser, dispatch, navigate, path]);

  return (
    <div className=" ">
      <div className="">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      </div>
    </div>
  );
};

export default GoogleLoginn;
