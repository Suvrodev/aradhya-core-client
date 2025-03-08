import { FormEvent, useState } from "react";
import { FaGraduationCap, FaSchool } from "react-icons/fa";
import { useAppSelector } from "../../../redux/hook";
import { verifyToken } from "../../../utils/Fucntion/verifyToken";
import {
  useGetSpecificStudentQuery,
  useUpdateStudentMutation,
} from "../../../redux/api/features/Student/studentManagementApi";
import { TStudent } from "../../../utils/types/globalTypes";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import { toast } from "sonner";
import { sonarId } from "../../../utils/Fucntion/sonarId";

const Education = () => {
  const [updateUser] = useUpdateStudentMutation();
  const { token } = useAppSelector((state) => state.auth);
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data, isLoading } = useGetSpecificStudentQuery(user?.studentId);
  const loggedStudent: TStudent = data?.data;

  const [currentEducation, setCurrentEducation] = useState(
    loggedStudent?.currentEducation || ""
  );
  const [educationInstitute, setEducationInstitute] = useState(
    loggedStudent?.educationInstitute || ""
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateData = { currentEducation, educationInstitute };
    toast.loading("Updating Education Information", { id: sonarId });
    const res = await updateUser({
      id: loggedStudent?.studentId,
      updateData,
    }).unwrap();
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
          <h2 className="text-2xl font-bold text-[#00C8FF] border-b border-dashed border-[#004E6A] pb-2">
            Education Information
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
            {/* Current Education */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaGraduationCap className="text-[#00C8FF]" />
                <span className="text-gray-300">Current Education</span>
              </div>
              <input
                type="text"
                name="currentEducation"
                value={currentEducation}
                onChange={(e) => setCurrentEducation(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
                placeholder="Enter your current education level (e.g., High School, Bachelor's)"
              />
            </div>

            {/* Education Institute */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaSchool className="text-[#00C8FF]" />
                <span className="text-gray-300">Education Institute</span>
              </div>
              <input
                type="text"
                name="educationInstitute"
                value={educationInstitute}
                onChange={(e) => setEducationInstitute(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
                placeholder="Enter your education institute name"
              />
            </div>

            {/* Save Button */}
            <button className="w-full p-2 mt-4 bg-[#00C8FF] text-gray-900 font-bold rounded-md hover:bg-[#0085B7] transition">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Education;
