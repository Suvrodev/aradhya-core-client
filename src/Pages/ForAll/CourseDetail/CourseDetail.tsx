import "./CourseDetail.css";
import { useParams } from "react-router";
import { useGetSpecificCourseQuery } from "../../../redux/api/features/Course/courseManagementApi";
import { useTitle } from "../../../Component/hook/useTitle";
// import { FaStar, FaPlayCircle } from "react-icons/fa";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import { TCourse } from "../../../utils/types/globalTypes";
import ReactPlayer from "react-player/youtube";
import EnrollCourseModal from "../EnrollCourse/EnrollCourseModal/EnrollCourseModal";

const CourseDetail = () => {
  useTitle("Course Detail");
  const { id } = useParams();

  const { data: CourseData, isLoading } = useGetSpecificCourseQuery(id);
  const course: TCourse = CourseData?.data;
  console.log("Course: ", course);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={course.courseImage}
            alt={course.courseTitle}
            className="w-full md:w-96 h-64 object-cover rounded-2xl shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{course.courseTitle}</h1>
            <p className="text-lg text-gray-300 mb-6">
              {course.courseDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-purple-600/50 px-4 py-2 rounded-full text-sm font-semibold">
                ⭐ {course.courseReview} Rating
              </span>
              <span className="bg-blue-600/50 px-4 py-2 rounded-full text-sm font-semibold">
                ⏳ {course.courseDuration}
              </span>
              <span className="bg-green-600/50 px-4 py-2 rounded-full text-sm font-semibold">
                💲 {course.coursePrice}{" "}
                {course.courseDiscount && (
                  <span className="text-yellow-300">
                    ({course.courseDiscount}% OFF)
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Course Details */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6">Course Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(course.courseStartDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Class Number:</strong> {course.courseClassNumber}
            </p>
            <p>
              <strong>Projects:</strong> {course.courseProjectNumber}
            </p>
            <p>
              <strong>Status:</strong> {course.courseStatus}
            </p>
            {course.courseDiscountReason && (
              <p>
                <strong>Discount Reason:</strong> {course.courseDiscountReason}
              </p>
            )}
          </div>
        </div>

        {/* Embedded YouTube Video */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6">Course Preview</h2>
          <div className="aspect-w-16 aspect-h-9">
            <ReactPlayer
              url={course?.courseYoutubeVideo}
              controls={true}
              className="react-player"
            />
          </div>
        </div>

        {/* Course Configuration */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6">Course Configuration</h2>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: course.computerConfiguration }}
          />
        </div>
      </div>

      {/* Footer Section */}
      <div className="max-w-7xl mx-auto mt-12 flex justify-center gap-4">
        <EnrollCourseModal
          courseId={course?.courseId}
          courseTitle={course?.courseTitle}
          courseImage={course?.courseImage}
        />
        {course.courseCouponStatus && (
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105">
            Apply Coupon
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
