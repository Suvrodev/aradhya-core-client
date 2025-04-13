import { FormEvent, useState } from "react";
import { FaMapMarkerAlt, FaHome } from "react-icons/fa";
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
import { useTitle } from "../../../Component/hook/useTitle";

const Address = () => {
  useTitle(`Address`);
  const [updateUser] = useUpdateStudentMutation();
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data, isLoading } = useGetSpecificStudentQuery(user?.email);
  const loggedStudent: TStudent = data?.data;

  const [presentAddress, setPresentAddress] = useState(
    loggedStudent?.presentAddress || ""
  );
  const [permanentAddress, setPermanentAddress] = useState(
    loggedStudent?.permanentAddress || ""
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateData = { presentAddress, permanentAddress };
    toast.loading("Updating Address", { id: sonarId });
    const res = await updateUser({
      email: loggedStudent?.email,
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
            Address Information ({loggedStudent?.role})
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
            {/* Present Address */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-[#00C8FF]" />
                <span className="text-gray-300">Present Address</span>
              </div>
              <textarea
                name="presentAddress"
                value={presentAddress}
                onChange={(e) => setPresentAddress(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none resize-none"
                rows={4}
                placeholder="Enter your present address"
              />
            </div>

            {/* Permanent Address */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaHome className="text-[#00C8FF]" />
                <span className="text-gray-300">Permanent Address</span>
              </div>
              <textarea
                name="permanentAddress"
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none resize-none"
                rows={4}
                placeholder="Enter your permanent address"
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

export default Address;
