import { useState } from "react";
import "./EnrolledCard.css";
import {
  TAssignedStudent,
  TBatch,
  TCourse,
} from "../../../../utils/types/globalTypes";
import { useGetSpecificCourseQuery } from "../../../../redux/api/features/Course/courseManagementApi";
import { formatDate } from "../../../../utils/Fucntion/convertDate";
import { useGetJustOneBatchForUpdateQuery } from "../../../../redux/api/features/Batch/batchManagementApi";
import CourseSchedule from "./CourseSchedule/CourseSchedule";

interface IProps {
  data: TAssignedStudent;
}

const EnrolledCard = ({ data }: IProps) => {
  console.log("Own Course: ", data);

  const { data: singleCourseData, isLoading } = useGetSpecificCourseQuery(
    data?.courseId
  );

  const { data: singleBatchData, isLoading: batchLoading } =
    useGetJustOneBatchForUpdateQuery(data?.batchId);

  const batchdetail: TBatch = singleBatchData?.data;
  console.log("Batch detail: ", batchdetail);
  const courseDetail: TCourse = singleCourseData?.data;
  const [isFlipped, setIsFlipped] = useState(false);

  if (isLoading || batchLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div>
      {/* Notice with Background Color Options */}
      {batchdetail?.batchNotice && (
        <div className="relative w-full max-w-4xl mx-auto mb-6 rounded-lg overflow-hidden">
          {/* Choose ONE of these background options by uncommenting */}

          {/* OPTION 1: Gradient Background (Premium) */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-700/80 to-indigo-800/80"></div> */}

          {/* OPTION 2: Solid Color with Opacity */}
          <div className="absolute inset-0 bg-indigo-900/90"></div>

          {/* OPTION 3: Dark with subtle pattern */}
          {/* <div className="absolute inset-0 bg-[#1a1b2e] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMxZTFlMmUiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div> */}

          <div className="relative p-5 md:p-6">
            {/* Notification Header */}
            <div className="flex items-center mb-3">
              <div className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center mr-3">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                OFFICIAL NOTICE
              </div>
              <div className="text-xs text-white/60">
                {formatDate(new Date().toString())} • Batch #{data?.batchId}
              </div>
            </div>

            {/* Notice Content */}
            <div
              className="text-white/90 text-sm md:text-base leading-relaxed space-y-2 prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: batchdetail.batchNotice }}
            />

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-16 h-16 -mr-4 -mt-4 bg-yellow-400/10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 h-1 w-24 bg-yellow-400"></div>
          </div>
        </div>
      )}

      {/* Start Card Design */}
      {/* Start Card Design */}
      {/* Start Card Design */}
      {/* Start Card Design */}
      <div className=" bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-2xl overflow-hidden transform transition-all  w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
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

              <div>
                <CourseSchedule batchId={data?.batchId} />
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
      </div>
    </div>
  );
};

export default EnrolledCard;
