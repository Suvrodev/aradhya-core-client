import { FormEvent, useState } from "react";
import InstructorRegistration from "./InstructorRegistration";
import { Link, useNavigate } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import { toast } from "sonner";
import { useAppDispatch } from "../../../../redux/hook";
import { useInstructorLoginMutation } from "../../../../redux/api/features/auth/authApi";
import { verifyToken } from "../../../../utils/Fucntion/verifyToken";
import { TStudent } from "../../../../utils/types/globalTypes";
import { setUser } from "../../../../redux/api/features/auth/authSlice";
const InstructorLogin = () => {
  const [instructorLogin] = useInstructorLoginMutation();
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const email = Form.email.value;
    const password = Form.password.value;
    const formData = { email, password };
    console.log("Form Data: ", formData);

    toast.loading("Loginging", { id: sonarId });
    const res = await instructorLogin(formData).unwrap();
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[650px]">
        {/* Start From Here */}
        {/* Left Side - Swaps between overlay and form */}
        <div
          className={`w-full md:w-1/2 p-8 transition-all duration-700 ease-in-out ${
            isSignUpActive
              ? "bg-white"
              : "bg-gradient-to-br from-purple-400 to-purple-800 text-white rounded-r-3xl" // Purple gradient
          }`}
        >
          {isSignUpActive ? (
            <InstructorRegistration setIsSignUpActive={setIsSignUpActive} />
          ) : (
            // Overlay Text (Left by default)
            <div className="h-full flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-bold mb-4">New here?</h2>
              <p className="mb-6">Sign up and become an instructor today!</p>
              <button
                onClick={() => setIsSignUpActive(true)}
                className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Right Side - Swaps between form and overlay */}
        <div
          className={`w-full md:w-1/2 p-8 transition-all duration-700 ease-in-out ${
            isSignUpActive
              ? "bg-gradient-to-br from-indigo-600 to-pink-600 text-white rounded-l-3xl"
              : "bg-white"
          }`}
        >
          {isSignUpActive ? (
            // Overlay Text (Right when active)
            <div className="h-full flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-bold mb-4">
                Already have an account?
              </h2>
              <p className="mb-6">Sign in to continue teaching with us.</p>
              <button
                onClick={() => setIsSignUpActive(false)}
                className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition "
              >
                Sign In
              </button>
            </div>
          ) : (
            // Login Form (Right by default)
            <div className="h-full flex flex-col justify-center animate-slide-in">
              <h2 className="text-2xl font-bold text-center mb-6 text-black">
                Sign In Instructor
              </h2>
              <form onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-white">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered w-full bg-gray-100 text-gray-800"
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
                    className="input input-bordered w-full bg-gray-100 text-gray-800"
                    name="password"
                    required
                  />

                  <div
                    onClick={handleShowPassword}
                    className="absolute right-10 bottom-3 cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </div>
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                  />
                </div>
                <div className="flex  flex-row my-2 text-black">
                  <Link
                    to={"/instructor-forget-password"}
                    className="underline flex justify-start w-1/2"
                  >
                    Forget Password
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;
