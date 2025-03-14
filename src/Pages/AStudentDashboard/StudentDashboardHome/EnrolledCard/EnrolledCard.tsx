import { useState } from "react";
import "./EnrolledCard.css";
import { TAssignedStudent, TCourse } from "../../../../utils/types/globalTypes";
import { useGetSpecificCourseQuery } from "../../../../redux/api/features/Course/courseManagementApi";

interface IProps {
  data: TAssignedStudent;
}

const EnrolledCard = ({ data }: IProps) => {
  const { data: singleCourseData, isLoading } = useGetSpecificCourseQuery(
    data?.courseId
  );

  const courseDetail: TCourse = singleCourseData?.data;
  const [isFlipped, setIsFlipped] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg shadow-2xl overflow-hidden transform transition-all hover:scale-105 h-full">
      {/* Flip Card Section (Unchanged) */}
      <div
        className="flip-card"
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
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Title Section (Aesthetic Placement) */}
      <div className="p-6 text-white flex items-start h-full">
        <h1 className="text-4xl font-bold uppercase tracking-widest leading-tight">
          {courseDetail?.courseTitle}
        </h1>
      </div>
    </div>
  );
};

export default EnrolledCard;
