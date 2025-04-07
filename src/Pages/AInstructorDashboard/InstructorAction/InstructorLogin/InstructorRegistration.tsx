import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router";

const InstructorRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowPasswordConfirm(!showPasswordConfirm);
  const handleAcceptTerms = (e: ChangeEvent<HTMLInputElement>) =>
    setAcceptTerms(e.target.checked);

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = {
      //   name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password don't match", { id: sonarId });
      return;
    }

    console.log("Form Data: ", formData);
    toast.loading("Creating instructor account", { id: sonarId });

    // Uncomment when ready to implement API call
    // try {
    //   const res = await addRegister(formData).unwrap();
    //   if (res?.success) {
    //     toast.success("Registration successful", { id: sonarId });
    //     navigate("/login");
    //   }
    // } catch (error) {
    //   toast.error("Registration failed", { id: sonarId });
    // }
  };

  return (
    <div className="max-w-md mx-auto p-2 bg-white rounded-lg shadow-md animate-slide-in">
      <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
        Instructor Registration
      </h2>

      <form onSubmit={handleRegistration} className="space-y-2">
        {/* Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">
              Full Name
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full bg-gray-100 text-gray-800"
            name="name"
            required
          />
        </div>

        {/* Phone Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">
              Phone Number
            </span>
          </label>
          <input
            type="tel"
            placeholder="Enter phone number"
            className="input input-bordered w-full bg-gray-100 text-gray-800"
            name="phone"
            required
          />
        </div>

        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">
              Email
            </span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full bg-gray-100 text-gray-800"
            name="email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">
              Password
            </span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            className="input input-bordered w-full bg-gray-100 text-gray-800 pr-10"
            name="password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">
              Confirm Password
            </span>
          </label>
          <input
            type={showPasswordConfirm ? "text" : "password"}
            placeholder="Confirm password"
            className="input input-bordered w-full bg-gray-100 text-gray-800 pr-10"
            name="confirmPassword"
            required
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
          >
            {showPasswordConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptTerms}
            onChange={handleAcceptTerms}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="acceptTerms"
            className="ml-2 block text-sm text-gray-700"
          >
            I accept the{" "}
            <Link
              to="/terms-and-condition"
              className="text-blue-600 hover:underline"
            >
              Terms and Conditions
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!acceptTerms}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            acceptTerms
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          } transition-colors`}
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default InstructorRegistration;
