import { FormEvent, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { useAppSelector } from "../../../redux/hook";
import { verifyToken } from "../../../utils/Fucntion/verifyToken";
import { useGetSpecificStudentQuery } from "../../../redux/api/features/Student/studentManagementApi";
import { TStudent } from "../../../utils/types/globalTypes";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import { CornerRightUp, Code } from "lucide-react";

const MyProfile = () => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data, isLoading } = useGetSpecificStudentQuery(user?.studentId);
  const loggedStudent: TStudent = data?.data;
  // console.log("Logged Student in My Profile: ", loggedStudent);

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  const hanldeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form ");
    const Form = event.target as HTMLFormElement;
    const name = Form.namee.value;
    console.log("Here");
    const phone = Form.phone.value;

    const formData = { name, phone };
    console.log("Form Data:  ", formData);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div className=" flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-2xl bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative">
          <button
            onClick={toggleEdit}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          >
            {isEditing ? <CornerRightUp /> : <FiEdit2 size={20} />}
          </button>

          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://i.ibb.co/d4rvmWjR/logged-User.png"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-2"
            />
            <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition">
              Change Profile Image
            </button>
          </div>

          <h2 className="text-2xl font-bold text-[#00C8FF] border-b border-dashed border-[#004E6A] pb-2">
            My Profile
          </h2>
          <form
            onSubmit={hanldeSubmit}
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
                defaultValue={loggedStudent?.studentId}
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

            <button
              className="relative left-0 md:left-6  w-full p-2 mt-4 bg-[#00C8FF] text-gray-900 font-bold rounded-md hover:bg-[#0085B7] transition disabled:bg-gray-400"
              disabled={!isEditing}
              onClick={toggleEdit}
            >
              Save Changes
            </button>
          </form>

          <h2 className="text-xl font-bold text-[#00C8FF] mt-8 border-b border-dashed border-[#004E6A] pb-2">
            Password
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <FaLock className="text-[#00C8FF]" />
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaLock className="text-[#00C8FF]" />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
              />
            </div>
          </div>

          <button className="w-full p-2 mt-4 bg-[#00C8FF] text-gray-900 font-bold rounded-md hover:bg-[#0085B7] transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
