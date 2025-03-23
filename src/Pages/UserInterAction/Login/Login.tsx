import { useLottie } from "lottie-react";
import loginAnimation from "../../../assets/Lottie/Login_Lottie.json";
import { Link, useNavigate } from "react-router";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import { useLoginMutation } from "../../../redux/api/features/auth/authApi";
import { useAppDispatch } from "../../../redux/hook";
import { StartFromTop } from "../../../Component/hook/StartFromTop";
import { verifyToken } from "../../../utils/Fucntion/verifyToken";
import { setUser } from "../../../redux/api/features/auth/authSlice";
import { useTitle } from "../../../Component/hook/useTitle";
import { TStudent } from "../../../utils/types/globalTypes";
const Login = () => {
  useTitle("Login");
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const options = {
    animationData: loginAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  const navigate = useNavigate();
  // const loc = useLocation();
  // console.log(loc)
  // const toGo = loc.state?.from?.pathname || "/";
  // console.log("joidergtjeoibghjeroigjoieri", toGo);
  // const toGo = "/";
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const email = Form.email.value;
    const password = Form.password.value;
    const formData = { email, password };
    console.log("Form Data: ", formData);

    toast.loading("Loginging", { id: sonarId });
    const res = await login(formData).unwrap();
    console.log("Res: ", res);
    const token = res?.data?.token;
    const user: TStudent = verifyToken(token);
    if (res?.success) {
      console.log("User: ", user);
      toast.success("Login successfully", { id: sonarId });
      dispatch(setUser({ user, token }));
      navigate(`/${user?.role}-dashboard`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-h-screen">
      <StartFromTop />

      <div className="w-full md:w-[50%]   flex items-center justify-center">
        <div className="card-body  flex flex-col justify-center  ">
          <h1 className="text-3xl font-bold text-center">Login now!</h1>
          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered bg-gray-700 text-white"
                name="email"
                required
              />
            </div>

            <div className="form-control relative text-white">
              <label className="label font-bold">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered bg-gray-700 text-white"
                name="password"
                required
              />

              <div
                onClick={handleShowPassword}
                className="absolute right-10 bottom-3 cursor-pointer"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>
            <div className="form-control mt-6">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
            <div className="flex  flex-row my-2">
              <p className=" w-1/2">
                Don't have an account? Go to{" "}
                <Link
                  to={"/registration"}
                  className="font-bold underline text-blue-600"
                >
                  Registration
                </Link>{" "}
              </p>
              <Link
                to={"/forget-password"}
                className="underline flex justify-end w-1/2"
              >
                Forget Password
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full md:w-[50%] flex items-center justify-center  p-0 md:p-20">
        <div className="w-full">{View}</div>
      </div>
    </div>
  );
};

export default Login;
