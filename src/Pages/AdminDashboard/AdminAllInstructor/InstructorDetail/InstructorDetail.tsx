import { Modal } from "antd";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useGetSpecificInstructorQuery } from "../../../../redux/api/features/Instructor/instructorManagementApi";
import LoadingPage from "../../../../Component/LoadingPage/LoadingPage";
import { useGetBatchUnderInstructorQuery } from "../../../../redux/api/features/Batch/batchManagementApi";
import { TBatch } from "../../../../utils/types/globalTypes";
import { useAppSelector } from "../../../../redux/hook";

interface IProps {
  instructorId: number;
}

const InstructorDetail = ({ instructorId }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { courses } = useAppSelector((state) => state.courses);
  //   console.log("Come Course: ", courses);
  const { data, isLoading } = useGetSpecificInstructorQuery(instructorId);
  const instructor = data?.data;

  const { data: batchData, isLoading: batchLoading } =
    useGetBatchUnderInstructorQuery(instructorId);
  const batches = batchData?.data || [];

  if (isLoading || batchLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="">
      <div onClick={showModal}>
        <button className="w-[30px] h-[30px] bg-green-500 text-white flex justify-center items-center rounded-md p-2 hover:bg-green-600 transition-colors">
          <Settings size={16} />
        </button>
      </div>
      <Modal
        title="Instructor Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        {instructor && (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-100">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-800">
                  {instructor.name}
                </h1>
                <p className="text-gray-600">{instructor.email}</p>
                <p className="text-gray-600">{instructor.phone}</p>
                <div className="mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      instructor.status === "enable"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {instructor.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Batches Section */}
            {batches.length > 0 && (
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                  Assigned Batches ({batches.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {batches.map((batch: TBatch) => (
                    <div
                      key={batch.batchId}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-medium text-gray-800">
                        {batch.batchName}
                      </h3>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="flex items-center gap-2">
                          <span className="text-gray-500">ID:</span>
                          <span className="font-medium">{batch.batchId}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-gray-500">Course code:</span>
                          <span className="font-medium">
                            {batch.underCourse}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-gray-500">Course Name:</span>
                          <span className="font-medium">
                            {courses.find(
                              (course) => course.courseId === batch.underCourse
                            )?.courseTitle || "Not found"}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-gray-500">Batch Status:</span>
                          <span
                            className={`font-medium px-2 py-1 rounded-md text-white ${
                              batch.batchStatus === "upComing"
                                ? "bg-green-500"
                                : batch.batchStatus === "onGoing"
                                ? "bg-yellow-500"
                                : batch.batchStatus === "end"
                                ? "bg-red-500"
                                : "bg-gray-400"
                            }`}
                          >
                            {batch.batchStatus}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-gray-500">Start:</span>
                          <span className="font-medium">{batch.start}</span>
                        </p>
                        {batch.end && (
                          <p className="flex items-center gap-2">
                            <span className="text-gray-500">End:</span>
                            <span className="font-medium">{batch.end}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Personal Information Section */}
            <div className="bg-gray-50 p-5 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">
                    {instructor.gender || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age Range</p>
                  <p className="font-medium">
                    {instructor.ageRange || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Present Address</p>
                  <p className="font-medium">
                    {instructor.presentAddress || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Permanent Address</p>
                  <p className="font-medium">
                    {instructor.permanentAddress || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-gray-50 p-5 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                Education
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current Education</p>
                  <p className="font-medium">
                    {instructor.currentEducation || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Education Institute</p>
                  <p className="font-medium">
                    {instructor.educationInstitute || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Section */}
            {(instructor.facebookUrl ||
              instructor.githubUrl ||
              instructor.linkedinUrl ||
              instructor.twitterUrl) && (
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                  Social Links
                </h2>
                <div className="flex flex-wrap gap-3">
                  {instructor.facebookUrl && (
                    <a
                      href={instructor.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Facebook
                    </a>
                  )}
                  {instructor.githubUrl && (
                    <a
                      href={instructor.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {instructor.linkedinUrl && (
                    <a
                      href={instructor.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                  {instructor.twitterUrl && (
                    <a
                      href={instructor.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Twitter
                    </a>
                  )}
                  {instructor.whatsappNumber && (
                    <a
                      href={`https://wa.me/${instructor.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Technical Information Section */}
            <div className="bg-gray-50 p-5 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                Technical Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Device Type</p>
                  <p className="font-medium">
                    {instructor.deviceType || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Internet Type</p>
                  <p className="font-medium">
                    {instructor.internetType || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Area Type</p>
                  <p className="font-medium">
                    {instructor.areaType || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InstructorDetail;
