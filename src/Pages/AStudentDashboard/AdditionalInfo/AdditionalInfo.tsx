import { FormEvent, useState } from "react";
import { FaUser, FaWifi, FaMobileAlt, FaMapMarkerAlt } from "react-icons/fa";
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

const AdditionalInfo = () => {
  useTitle(`Additional Info - Student`);
  const [updateUser] = useUpdateStudentMutation();
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data, isLoading } = useGetSpecificStudentQuery(user?.email);
  const loggedStudent: TStudent = data?.data;
  console.log("Logged Student----: ", loggedStudent);

  const [gender, setGender] = useState(loggedStudent?.gender || "");
  const [ageRange, setAgeRange] = useState(loggedStudent?.ageRange || "");
  const [device, setDevice] = useState(loggedStudent?.deviceType || "");
  const [internetType, setInternetType] = useState(
    loggedStudent?.internetType || ""
  );
  const [areaType, setAreaType] = useState(loggedStudent?.areaType || "");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateData = {
      gender,
      ageRange,
      deviceType: device,
      internetType,
      areaType,
    };
    console.log("Update Data: ", updateData);
    toast.loading("Updating Additional Info", { id: sonarId });
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
            Additional Information ({loggedStudent?.role})
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Gender */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaUser className="text-[#00C8FF]" />
                <span className="text-gray-300">Gender</span>
              </div>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-checkbox h-4 w-4 text-[#00C8FF] rounded"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-checkbox h-4 w-4 text-[#00C8FF] rounded"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Age Range */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaUser className="text-[#00C8FF]" />
                <span className="text-gray-300">Age Range</span>
              </div>
              <select
                name="ageRange"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
              >
                <option value="">Select Age Range</option>
                <option value="10-15">10-15</option>
                <option value="15-20">15-20</option>
                <option value="20-25">20-25</option>
                <option value="25-30">25-30</option>
                <option value="30-35">30-35</option>
                <option value="35-40">35-40</option>
              </select>
            </div>

            {/* Device */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaMobileAlt className="text-[#00C8FF]" />
                <span className="text-gray-300">Device</span>
              </div>
              <select
                name="device"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
              >
                <option value="">Select Device</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Tablet">Tablet</option>
                <option value="Desktop">Desktop</option>
              </select>
            </div>

            {/* Internet Type */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaWifi className="text-[#00C8FF]" />
                <span className="text-gray-300">Internet Type</span>
              </div>
              <select
                name="internetType"
                value={internetType}
                onChange={(e) => setInternetType(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
              >
                <option value="">Select Internet Type</option>
                <option value="Mobile Data">Mobile Data</option>
                <option value="Wifi">Wifi</option>
              </select>
            </div>

            {/* Area Type */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-[#00C8FF]" />
                <span className="text-gray-300">Area Type</span>
              </div>
              <select
                name="areaType"
                value={areaType}
                onChange={(e) => setAreaType(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
              >
                <option value="">Select Area Type</option>
                <option value="City">City</option>
                <option value="Village">Village</option>
              </select>
            </div>

            {/* Save Button */}
            <button className="w-full p-2 mt-4 bg-[#00C8FF] text-gray-900 font-bold rounded-md hover:bg-[#0085B7] transition col-span-1 md:col-span-2">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
