import { FormEvent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleLoginn from "../../../../../../Component/GoogleLoginn/GoogleLoginn";

interface IProps {
  batchId: string;
}
const NotLoggedUserForm = ({ batchId }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //   const Form = event.target as HTMLFormElement;
    //   const name = Form.namee.value;
    //   const phone = Form.phone.value;
    //   const email = Form.email.value;
    //   const password = Form.password.value;
    //   const confirmPassword = Form.confirmPassword.value;
    //   if (password != confirmPassword) {
    //     toast.error("Password and Confirm Password Doesn't Matched", {
    //       id: sonarId,
    //     });
    //     return;
    //   }

    //   const formData = { name, phone, email, password };
    //   console.log("Form Data: ", formData);
    //   toast.loading("Creating User", { id: sonarId });
    //   const res = await addRegister(formData).unwrap();
    //   console.log("Res: ", res);
    //   if (res?.success) {
    //     toast.success("Registration successfully", { id: sonarId });
    //     navigate("/login");
    //   }
  };
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center my-4 underline underline-offset-4">
        Student Detail
      </h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-300 mb-1 w-32">
            Student ID
          </label>
          <input
            type="text"
            className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
            disabled
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-300 mb-1 w-32">
            Student Name
          </label>
          <input
            type="text"
            className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
            disabled
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-300 mb-1 w-32">
            Batch ID
          </label>
          <input
            defaultValue={batchId}
            type="text"
            className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
            disabled
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-300 mb-1 w-32">
            Student Email
          </label>
          <input
            type="email"
            className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
            disabled
          />
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2">
        <form
          onSubmit={handleRegistration}
          className="grid grid-cols-1 gap-x-2"
        >
          <div className="form-control  ">
            <label className="label">
              <span className="label-text font-bold  text-white">Name</span>
            </label>
            <input
              type="text"
              placeholder=" Name"
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
              name="namee"
              required
            />
          </div>
          <div className="form-control  ">
            <label className="label">
              <span className="label-text font-bold  text-white hide-arrows">
                Phone Number
              </span>
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
              name="phone"
              required
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text font-bold text-white">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
              name="email"
              required
            />
          </div>

          <div className="form-control relative">
            <label className="label font-bold">
              <span className="label-text  text-white">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
              name="password"
              required
            />

            <div
              onClick={handleShowPassword}
              className="absolute right-10 bottom-3"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>

          <div className="form-control mt-6">
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
        </form>

        {/* Google Login STart */}
        <div className="flex items-center justify-center">
          <GoogleLoginn />
        </div>
      </div>
    </div>
  );
};

export default NotLoggedUserForm;
