import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useGoogleRegistrationMutation } from "../../redux/api/features/auth/authApi";
import { toast } from "sonner";
import { sonarId } from "../../utils/Fucntion/sonarId";

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
  const [addUser] = useGoogleRegistrationMutation();
  const [user, setUser] = useState<ToDBUSer | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: GoogleUser = jwtDecode(credentialResponse.credential);
      console.log("Decoded JWT:", decoded);
      const { given_name, family_name, email, picture } = decoded;
      const name = given_name + " " + family_name;
      setUser({ name, email, picture });
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User: ", user);
      const createUser = async () => {
        toast.loading("Logining...", { id: sonarId });
        const res = await addUser(user).unwrap();
        console.log("Res: ", res);
        if (res?.success) {
          toast.success("Login Successfully", { id: sonarId });
        }
      };

      createUser();
    }
  }, [user, addUser]);

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
