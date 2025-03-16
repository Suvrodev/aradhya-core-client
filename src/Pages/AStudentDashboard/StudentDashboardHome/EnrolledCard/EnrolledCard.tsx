import { useState } from "react";
import "./EnrolledCard.css";
import {
  TAssignedStudent,
  TBatch,
  TCourse,
} from "../../../../utils/types/globalTypes";
import { useGetSpecificCourseQuery } from "../../../../redux/api/features/Course/courseManagementApi";
import { formatDate } from "../../../../utils/Fucntion/convertDate";
import { useGetSpecificBatchQuery } from "../../../../redux/api/features/Batch/batchManagementApi";

interface IProps {
  data: TAssignedStudent;
}

const EnrolledCard = ({ data }: IProps) => {
  console.log("Own Course: ", data);

  const { data: singleCourseData, isLoading } = useGetSpecificCourseQuery(
    data?.courseId
  );

  const { data: singleBatchData, isLoading: batchLoading } =
    useGetSpecificBatchQuery(data?.batchId);

  const batchdetail: TBatch = singleBatchData?.data;
  const courseDetail: TCourse = singleCourseData?.data;
  const [isFlipped, setIsFlipped] = useState(false);

  if (isLoading || batchLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-between bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-2xl overflow-hidden transform transition-all  w-full max-w-4xl mx-auto">
      {/* Left Section: Course Details */}
      <div className="flex flex-col justify-between p-6 md:p-8 text-white w-full md:w-2/3 bg-whi">
        {/* Course Title */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">
            {courseDetail?.courseTitle}
          </h1>
        </div>

        {/* Batch and Enrollment Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs md:text-sm font-semibold bg-purple-800 px-3 py-1 rounded-full">
              Batch ID: {data?.batchId}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs md:text-sm font-semibold bg-purple-800 px-3 py-1 rounded-full">
              Enrolled: {formatDate(data?.createdAt)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs md:text-sm font-semibold bg-purple-800 px-3 py-1 rounded-full">
              Classes: {batchdetail?.classNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Flip Card (Unchanged) */}
      <div
        className="flip-card w-full md:w-1/3 relative h-64 md:h-auto"
        tabIndex={0}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onFocus={() => setIsFlipped(true)}
        onBlur={() => setIsFlipped(false)}
      >
        <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
          <img
            src={courseDetail?.courseImage}
            alt={courseDetail?.courseTitle}
            className="w-full h-full object-cover md:rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default EnrolledCard;
