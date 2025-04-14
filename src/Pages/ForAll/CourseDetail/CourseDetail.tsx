import { useParams } from "react-router";
import { useGetSpecificCourseQuery } from "../../../redux/api/features/Course/courseManagementApi";
import { useTitle } from "../../../Component/hook/useTitle";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import { TBatch, TCourse } from "../../../utils/types/globalTypes";
import ReactPlayer from "react-player/youtube";
import EnrollCourseModal from "../EnrollCourse/EnrollCourseModal/EnrollCourseModal";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetUpComingBatchUnderCourseQuery } from "../../../redux/api/features/Batch/batchManagementApi";

const CourseDetail = () => {
  useTitle("Course Detail");
  const { id } = useParams();
  const { data: CourseData, isLoading } = useGetSpecificCourseQuery(id);
  const course: TCourse = CourseData?.data;
  // console.log("Course: ", course);

  const { data, isLoading: batchLoading } = useGetUpComingBatchUnderCourseQuery(
    course?.courseId
  );
  const batch: TBatch = data?.data;
  console.log("Batch: ", batch);

  // React Slick settings for projects carousel
  const projectSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true,
    cssEase: "linear",
  };

  if (isLoading || batchLoading) return <LoadingPage />;

  // Format date to DD/MMM/YYYY (01/Jan/2025)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Calculate enrollment last date (batch.start - 1 day)
  const enrollmentLastDate = batch?.start
    ? new Date(new Date(batch.start).getTime() - 86400000)
    : null;
  const formattedEnrollmentLastDate = enrollmentLastDate
    ? formatDate(new Date(enrollmentLastDate).toISOString())
    : "Not specified";

  // Calculate discounted price
  const discountedPrice = Math.ceil(
    batch?.coursePrice -
      (batch?.coursePrice * (batch?.courseDiscount || 0)) / 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <div className="flex flex-col-reverse md:flex-row">
        {/* Left Side (60%) - Content */}
        <div className="w-full lg:w-[60%] p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Course Title & Description */}
            <div className="hidden md:block bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                {course?.courseTitle}
              </h1>
              {/* <p className="text-gray-300 text-lg leading-relaxed">
                {course?.courseDescription}
              </p> */}
              <p
                className="text-gray-300 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: course.courseDescription }}
              ></p>
            </div>

            {/* YouTube Video */}
            {course?.courseYoutubeVideo && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-teal-400">
                  YouTube Video
                </h2>
                <div className="w-full h-[450px] rounded-xl overflow-hidden">
                  <ReactPlayer
                    url={course.courseYoutubeVideo}
                    controls={true}
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "0.5rem", overflow: "hidden" }}
                  />
                </div>
              </div>
            )}

            {/* Course Features */}
            {course?.kikipaschen && course.kikipaschen.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-teal-400">
                  আমাদের কোর্সে কি কি পাচ্ছেন?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.kikipaschen.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span className="text-teal-400 mt-1">✦</span>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Stats */}
            {batch && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-teal-400">
                  Course Highlights
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center bg-white/10 p-3 rounded-lg">
                    <div className="text-3xl font-bold text-teal-400">
                      {batch?.classNumber}
                    </div>
                    <div className="text-gray-300 text-sm mt-1">Classes</div>
                  </div>
                  {batch?.projectnumber > 0 && (
                    <div className="text-center bg-white/10 p-3 rounded-lg">
                      <div className="text-3xl font-bold text-teal-400">
                        {batch?.projectnumber}
                      </div>
                      <div className="text-gray-300 text-sm mt-1">Projects</div>
                    </div>
                  )}
                  <div className="text-center bg-white/10 p-3 rounded-lg">
                    <div className="text-3xl font-bold text-teal-400">
                      {batch?.duration}{" "}
                    </div>
                    <div className="text-gray-300 text-sm mt-1">Duration</div>
                  </div>
                  <div className="text-center bg-white/10 p-3 rounded-lg">
                    <div className="text-3xl font-bold text-teal-400">
                      {course?.courseReview}/5
                    </div>
                    <div className="text-gray-300 text-sm mt-1">Rating</div>
                  </div>
                </div>
              </div>
            )}

            {/* Curriculum */}
            {course?.courseCurriculum && course.courseCurriculum.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-teal-400">
                  Curriculum
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {course.courseCurriculum.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span className="text-teal-400 mt-1">✓</span>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Needed Software */}
            {course?.neededSoftware && course.neededSoftware.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-teal-400">
                  Required Software
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {course.neededSoftware.map((software, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
                    >
                      <img
                        src={software.image}
                        alt={software.title}
                        className="w-16 h-16 object-contain mb-2"
                      />
                      <span className="text-gray-300 text-sm text-center">
                        {software.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Computer Configuration */}
            {course?.computerConfiguration && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-teal-400">
                  Computer Configuration
                </h2>
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: course.computerConfiguration,
                  }}
                />
              </div>
            )}

            {/* Job Positions */}
            {course?.jobposition && course.jobposition.length > 1 && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-teal-400">
                  Career Opportunities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.jobposition.map((position, index) => (
                    <div
                      key={index}
                      className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors flex items-center"
                    >
                      <div className="w-3 h-3 rounded-full bg-teal-400 mr-3"></div>
                      <h3 className="text-lg font-medium text-gray-300">
                        {position}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Batch Information */}
            {batch && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-teal-400">
                  Batch Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-teal-300">
                      Schedule
                    </h3>
                    <div className="space-y-3">
                      <p className="flex items-center">
                        <span className="font-medium w-32">Start Date:</span>
                        <span className="text-gray-300">
                          {formatDate(batch.start)}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium w-32">
                          Enrollment Ends:
                        </span>
                        <span className="text-gray-300">
                          {formattedEnrollmentLastDate}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium w-32">Duration:</span>
                        <span className="text-gray-300">
                          {batch.duration} Month
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-teal-300">
                      Class Schedule
                    </h3>
                    <div className="space-y-3">
                      <p className="flex items-center">
                        <span className="font-medium w-32">Class Days:</span>
                        <span className="text-gray-300">{batch.classdays}</span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium w-32">Support Day:</span>
                        <span className="text-gray-300">
                          {batch.supportdays}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Instructor Information */}
            {batch && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-teal-400">
                  Instructor
                </h2>
                <div className="flex items-center gap-4">
                  <img
                    src={batch.instructorimage}
                    alt={batch.instructorname}
                    className="w-16 h-16 rounded-full object-cover border-2 border-teal-400"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100">
                      {batch.instructorname}
                    </h3>
                    <a
                      href={batch.instructorfb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:underline inline-flex items-center mt-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Carousel */}
            {course?.projects && course.projects.length > 1 && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-teal-400">
                  Project Samples
                </h2>
                <div className="relative">
                  <Slider {...projectSettings}>
                    {course.projects.map((project, index) => (
                      <div key={index} className="px-2 outline-none">
                        <div className="relative group">
                          <img
                            src={project}
                            alt={`Project ${index + 1}`}
                            className="w-full h-96 object-contain rounded-lg shadow-lg transition-all duration-300 transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-lg font-medium">
                              Project {index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Side (40%) - Fixed Sidebar */}
        <div className="w-full lg:w-[40%] bg-gradient-to-b from-[#0a161b] to-[#162d35] p-6 lg:p-8 lg:sticky md:top-20 lg:h-screen ">
          <div className="space-y-6">
            {/* Course Image */}
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/10">
              <img
                src={course?.courseImage}
                alt={course?.courseTitle}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex flex-col gap-6">
              {/* Course Title & Description */}
              <div className="md:hidden bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  {course?.courseTitle}
                </h1>
                {/* <p className="text-gray-300 text-lg leading-relaxed">
                  {course?.courseDescription}
                </p> */}
                <p
                  className="text-gray-300 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: course.courseDescription }}
                ></p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <EnrollCourseModal
                  batchId={batch?.batchId}
                  batchName={batch?.batchName}
                  courseId={course?.courseId}
                  courseTitle={course?.courseTitle}
                  courseDuration={batch?.duration}
                  courseImage={course?.courseImage}
                  courseStartDate={batch?.start || "Upcoming"}
                  coursePrice={batch?.coursePrice}
                  courseDiscount={batch?.courseDiscount || 0}
                />
              </div>

              {/* Enrollment Deadline */}
              {batch?.start && (
                <div className="bg-red-900/20 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-red-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-red-300">
                        Enrollment Ends
                      </h4>
                      <p className="text-white font-medium">
                        {formattedEnrollmentLastDate}
                      </p>
                    </div>
                    <div className="bg-red-500/80 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Hurry Up!
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Compact Pricing Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-teal-400">Course Fee</h3>
                {batch?.courseDiscount > 0 && (
                  <span className="bg-teal-600/30 text-teal-300 px-2 py-1 rounded-full text-xs font-bold">
                    {batch.courseDiscount}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-end justify-between">
                {batch?.courseDiscount > 0 ? (
                  <>
                    <div>
                      <span className="text-gray-400 text-sm line-through">
                        ৳{batch?.coursePrice}
                      </span>
                      <span className="text-teal-400 text-xl font-bold ml-2">
                        ৳{discountedPrice}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-teal-400 text-xl font-bold">
                    ৳{batch?.coursePrice}
                  </span>
                )}
              </div>
            </div>

            {/* Batch Information */}
            {/* {batch && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-teal-400">
                  Class Schedule
                </h3>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <span className="font-medium w-32">Class Days:</span>
                    <span className="text-gray-300">{batch.classdays}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium w-32">Support Day:</span>
                    <span className="text-gray-300">{batch.supportdays}</span>
                  </p>
                </div>
              </div>
            )} */}

            {/* Instructor Information */}
            {/* {batch && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-teal-400">
                  Instructor
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src={batch.instructorimage}
                    alt={batch.instructorname}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-400"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">
                      {batch.instructorname}
                    </h3>
                    <a
                      href={batch.instructorfb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:underline text-sm inline-flex items-center mt-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
