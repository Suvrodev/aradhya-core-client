import { FormEvent, useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
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

const ImportantLink = () => {
  const [updateUser] = useUpdateStudentMutation();
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data, isLoading } = useGetSpecificStudentQuery(user?.studentId);
  const loggedStudent: TStudent = data?.data;

  const [facebookUrl, setFacebookUrl] = useState(
    loggedStudent?.facebookUrl || ""
  );
  const [twitterUrl, setTwitterUrl] = useState(loggedStudent?.twitterUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(
    loggedStudent?.linkedinUrl || ""
  );
  const [githubUrl, setGithubUrl] = useState(loggedStudent?.githubUrl || "");
  const [whatsappNumber, setWhatsappNumber] = useState(
    loggedStudent?.whatsappNumber || ""
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateData = {
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      githubUrl,
      whatsappNumber,
    };
    toast.loading("Updating Important Links", { id: sonarId });
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
            Important Links
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Facebook URL */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaFacebook className="text-[#00C8FF]" />
                <span className="text-gray-300">Facebook URL</span>
              </div>
              <input
                type="url"
                name="facebookUrl"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
                placeholder="Enter your Facebook profile URL"
              />
            </div>

            {/* Twitter URL */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaTwitter className="text-[#00C8FF]" />
                <span className="text-gray-300">Twitter URL</span>
              </div>
              <input
                type="url"
                name="twitterUrl"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
                placeholder="Enter your Twitter profile URL"
              />
            </div>

            {/* LinkedIn URL */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaLinkedin className="text-[#00C8FF]" />
                <span className="text-gray-300">LinkedIn URL</span>
              </div>
              <input
                type="url"
                name="linkedinUrl"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
                placeholder="Enter your LinkedIn profile URL"
              />
            </div>

            {/* GitHub URL */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <FaGithub className="text-[#00C8FF]" />
                <span className="text-gray-300">GitHub URL</span>
              </div>
              <input
                type="url"
                name="githubUrl"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
                placeholder="Enter your GitHub profile URL"
              />
            </div>

            {/* WhatsApp Number */}
            <div className="flex flex-col space-y-2 md:col-span-2">
              <div className="flex items-center space-x-3">
                <FaWhatsapp className="text-[#00C8FF]" />
                <span className="text-gray-300">WhatsApp Number</span>
              </div>
              <input
                type="tel"
                name="whatsappNumber"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 focus:ring-2 ring-[#00C8FF] outline-none"
                placeholder="Enter your WhatsApp number"
              />
            </div>

            {/* Save Button */}
            <button className="w-full p-2 mt-4 bg-[#00C8FF] text-gray-900 font-bold rounded-md hover:bg-[#0085B7] transition md:col-span-2">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImportantLink;
