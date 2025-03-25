import { Modal } from "antd";
import { useState } from "react";
import { useGetSpecificBatchQuery } from "../../../../../redux/api/features/Batch/batchManagementApi";
import { TBatch } from "../../../../../utils/types/globalTypes";
import "./CourseSchedule.css"; // Import the external CSS

interface IProps {
  batchId: string;
}

const CourseSchedule = ({ batchId }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const { data, isLoading } = useGetSpecificBatchQuery(batchId);
  const batch: TBatch = data?.data;
  const schedule = batch?.schedule;

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vibrant color palette
  const colorPalette = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-teal-400",
    "from-green-500 to-emerald-400",
    "from-yellow-500 to-orange-500",
    "from-red-500 to-pink-500",
    "from-indigo-500 to-purple-500",
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <button onClick={showModal} className="view-schedule-button">
        <span className="relative text-white font-bold">View Schedule</span>
      </button>

      <Modal
        title={<span className="modal-title">Class Schedule</span>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        className="custom-modal"
      >
        <div className="w-full max-w-5xl mx-auto py-4">
          {schedule?.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${
                    colorPalette[index % colorPalette.length]
                  } schedule-box`}
                >
                  <div className="p-3 text-white">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                          {formatDate(item.date)}
                        </span>
                        <h3 className="text-lg font-bold mt-1">{item.topic}</h3>
                      </div>
                      <div className="date-box">
                        <span className="text-lg font-bold block leading-none">
                          {new Date(item.date).getDate()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white border-opacity-20">
                      <span className="text-sm opacity-90">
                        Session {index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="empty-state-icon">
                <svg
                  className="w-12 h-12 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Schedule Available
              </h3>
              <p className="text-gray-500">Please check back later</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CourseSchedule;
