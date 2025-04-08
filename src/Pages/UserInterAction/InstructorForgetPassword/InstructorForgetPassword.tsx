import { useState } from "react";
import { EyeIcon, EyeOffIcon, X } from "lucide-react";
import {
  useForgetInstructorPasswordMutation,
  useUpdateInstructorPasswordAfterOTPMutation,
} from "../../../redux/api/features/auth/authApi";
import { toast } from "sonner";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import { Link } from "react-router";
import { useTitle } from "../../../Component/hook/useTitle";

const InstructorForgetPassword = () => {
  useTitle("Forget Password");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [forgetPassword] = useForgetInstructorPasswordMutation();
  const [updatePassword] = useUpdateInstructorPasswordAfterOTPMutation();

  ///Send OTP
  const handleSendOtp = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("No Account Found. Please use @gmail.com or @yahoo.com");
      return;
    }
    setErrorMessage("");
    try {
      toast.loading("Sending OTP in your mail", { id: sonarId });
      const res = await forgetPassword({ email: email }).unwrap();
      console.log("Res: ", res);
      if (res.success) {
        toast.success("Please check your email and check otp", { id: sonarId });
        setStep(2);
      }
    } catch {
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    ///Verify OTP
    if (otp.length !== 6) {
      setErrorMessage("Invalid OTP. Please enter a 6-digit code.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    setErrorMessage("");

    toast.loading("Updating password", { id: sonarId });
    const data = {
      email: email,
      otp: otp,
      password: password,
    };
    const res = await updatePassword(data).unwrap();
    console.log("Res: ", res);
    if (res?.success) {
      toast.success("Set Password successfully", { id: sonarId });
      setStep(3);
      setEmail("");
    }
    if (!res?.success) {
      setErrorMessage(res?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full md:w-8/12 lg:w-5/12 h-[100%] bg-gray-800 text-white shadow-xl rounded-lg p-6 ">
        <h2 className="text-center text-2xl font-bold">
          Instructor Password Recovery
        </h2>
        {errorMessage && (
          <div className="bg-[#F7D7DA] text-[#7B2C2E] px-2 py-6 rounded mt-2 relative">
            {errorMessage}
            <p
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setErrorMessage("")}
            >
              <X />
            </p>
          </div>
        )}

        {step == 1 && (
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500 p-2 rounded disabled:text-gray-400"
              placeholder="Enter your email"
            />
            <button
              onClick={handleSendOtp}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 p-2 rounded"
            >
              Submit Email
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500 p-2 rounded"
                placeholder="Enter OTP"
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500 p-2 rounded"
                  placeholder="Enter new password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              <label className="block mt-4 mb-2 text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500 p-2 rounded"
                  placeholder="Confirm new password"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              <button
                onClick={handleResetPassword}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 p-2 rounded"
              >
                Reset Password
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className=" flex items-center justify-center  p-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:p-12 text-center max-w-md w-full">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Success Message */}
              <h1 className="text-3xl font-bold text-white mb-4">
                Password Successfully Set!
              </h1>
              <p className="text-white/80 mb-6">
                Your password has been updated successfully. You can now log in
                with your new password.
              </p>

              {/* Go to Login Button */}
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all transform hover:scale-105"
              >
                Go to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorForgetPassword;
