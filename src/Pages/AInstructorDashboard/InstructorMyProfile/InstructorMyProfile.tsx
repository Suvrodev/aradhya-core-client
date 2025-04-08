import { FormEvent, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { useAppSelector } from "../../../redux/hook";
import { verifyToken } from "../../../utils/Fucntion/verifyToken";
import { TInstructor } from "../../../utils/types/globalTypes";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import { CornerRightUp, Code, Camera } from "lucide-react";
import { toast } from "sonner";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import axios from "axios";
import {
  useGetSpecificInstructorQuery,
  useUpdateInstructorePasswordMutation,
  useUpdateInstructorMutation,
} from "../../../redux/api/features/Instructor/instructorManagementApi";

const imageHostingUrl = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDNARY_API_KEY
}/image/upload`;

const InstructorMyProfile = () => {
  const [updateUser] = useUpdateInstructorMutation();
  const [updatePassword] = useUpdateInstructorePasswordMutation();
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data, isLoading } = useGetSpecificInstructorQuery(user?.studentId);
  const loggedStudent: TInstructor = data?.data;
  // console.log("Logged Student in My Profile: ", loggedStudent);

  const [profileImage, setProfileImage] = useState(loggedStudent?.image);
  const [imageSelected, setImageSelected] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [imageFile, setImageFile] = useState<any>("");
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setImageSelected(true);
      setImageFile(file);
    }
  };

  const updateImage = async () => {
    console.log("Profile Image: ", profileImage);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append(
      "upload_preset",
      `${import.meta.env.VITE_ClOUDNARY_PRESET}`
    );
    formData.append(
      "cloud_name",
      `{${import.meta.env.VITE_CLOUDNARY_API_KEY}}`
    );

    try {
      toast.loading("Uploading Image", { id: sonarId });
      const response = await axios.post(imageHostingUrl, formData);
      console.log("Image Upload Response", response);
      if (response.data.url) {
        const imageUrl = response.data.url;
        console.log("New Image Linkkkkkkk: ", imageUrl);
        toast.success("Image Uploaded", { id: sonarId });
        const updateData = { image: imageUrl };
        toast.loading("Updating Image", { id: sonarId });
        const res = await updateUser({
          id: loggedStudent?.instructorId,
          updateData,
        }).unwrap();
        console.log("Update Res: ", res);
        if (res?.success) {
          toast.success("Update Image Successfully", { id: sonarId });
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Something Erron in Upload Image", { id: sonarId });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form ");
    const Form = event.target as HTMLFormElement;
    const name = Form.namee.value;
    console.log("Here");
    const phone = Form.phone.value;

    const updateData = { name, phone };
    // console.log("Update Data:  ", updateData);
    toast.loading("Updating", { id: sonarId });
    const res = await updateUser({
      id: loggedStudent?.instructorId,
      updateData,
    }).unwrap();
    // console.log("Res: ", res);
    if (res?.success) {
      toast.success(res?.message, { id: sonarId });
    }
  };

  const handleSubmitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const password = Form.currentPassword.value;
    const newPassword = Form.newPassword.value;
    const confirmPassword = Form.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      toast.error("Password and confirm Password is not matched ", {
        id: sonarId,
      });
      return;
    }

    const updateData = { oldPassword: password, newPassword };
    // console.log("Update Data: ", updateData);
    toast.loading("Updating Password", { id: sonarId });
    const res = await updatePassword({
      id: loggedStudent?.instructorId,
      updateData,
    }).unwrap();
    console.log("Res: ", res);
    if (res?.success) {
      toast.success(res?.message, { id: sonarId });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-2xl bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-6 relative ">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-2"
            />
            <label
              htmlFor="file-upload"
              className="absolute top-0 right-[60px] md:right-[240px] bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition"
            >
              <Camera className="text-[#00C8FF]" />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              className={`p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition ${
                !imageSelected && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!imageSelected}
              onClick={() => updateImage()}
            >
              Change Profile Image
            </button>
          </div>

          <div className="relative">
            <h2 className="text-2xl font-bold text-[#00C8FF] border-b border-dashed border-[#004E6A] pb-2">
              My Profile ({loggedStudent?.role})
            </h2>
            <button
              onClick={toggleEdit}
              className="absolute top-0 right-4 text-gray-400 hover:text-white transition"
            >
              {isEditing ? <CornerRightUp /> : <FiEdit2 size={20} />}
            </button>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3">
                <FaUser className="text-[#00C8FF]" />
                <input
                  type="text"
                  name="namee"
                  defaultValue={loggedStudent?.name}
                  disabled={!isEditing}
                  className={`w-full p-2 rounded-md bg-gray-800 focus:ring-2 ${
                    isEditing
                      ? "ring-[#00C8FF]"
                      : "ring-transparent text-gray-400"
                  } outline-none transition`}
                />
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-[#00C8FF]" />
                <input
                  type="email"
                  name="email"
                  defaultValue={loggedStudent?.email}
                  disabled
                  className="w-full p-2 rounded-md bg-gray-700 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Code className="text-[#00C8FF] size-4" />
                <input
                  type="text"
                  name="studentId"
                  defaultValue={loggedStudent?.instructorId}
                  disabled
                  className="w-full p-2 rounded-md bg-gray-700 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-[#00C8FF]" />
                <input
                  type="number"
                  name="phone"
                  defaultValue={loggedStudent?.phone}
                  disabled={!isEditing}
                  className={`w-full p-2 rounded-md bg-gray-800 focus:ring-2 ${
                    isEditing
                      ? "ring-[#00C8FF]"
                      : "ring-transparent text-gray-400"
                  } outline-none transition`}
                />
              </div>
              {isEditing && (
                <button className="relative left-0 md:left-6 w-full p-2 mt-4 bg-[#00C8FF] text-gray-900 font-bold rounded-md hover:bg-[#0085B7] transition disabled:bg-gray-400">
                  Save Changes
                </button>
              )}
            </form>
          </div>
          <h2 className="text-xl font-bold text-[#00C8FF] mt-8 border-b border-dashed border-[#004E6A] pb-2">
            Password
          </h2>
          <form
            onSubmit={handleSubmitPassword}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-3">
              <FaLock className="text-[#00C8FF]" />
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
                required
              />
            </div>
            <div className="flex items-center space-x-3">
              <FaLock className="text-[#00C8FF]" />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
                required
              />
            </div>
            <div className="flex items-center space-x-3">
              <FaLock className="text-[#00C8FF]" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
                required
              />
            </div>
            <div></div>
            <button className="w-full p-2 mt-4 bg-[#00C8FF] text-gray-900 font-bold rounded-md hover:bg-[#0085B7] transition">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstructorMyProfile;
