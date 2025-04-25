import "./CourseBox.css";
import { Link } from "react-router";
import { TCourseBox } from "../../../../../../utils/types/globalTypes";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { motion } from "framer-motion"; // <-- Add this import

interface IProps {
  data: TCourseBox;
  number: number;
}
const CourseBox = ({ data, number }: IProps) => {
  // console.log("Course data: ", data);
  const { courseId, courseTitle, courseImage, courseExists } = data;

  return (
    <div
      className={`flex flex-col gap-y-4  rounded-md border-[4px] shadow-md shadow-gray-700   ${
        number % 2
          ? "bg-[#EDECFA] border-[#EDECFA]"
          : "bg-[#9FD5D7]  border-[#9FD5D7]"
      }`}
    >
      <img
        src={courseImage}
        alt=""
        className="w-[960px] h-[180px] rounded-md "
      />
      <div className={`px-4  h-[200px] relative`}>
        <h1 className="text-[20px] text-left font-bold text-black">
          {courseTitle}
        </h1>
        {courseExists == "yes" ? (
          <div>
            <div className="mt-2 text-black text-[15px]  flex gap-x-4 ">
              <div className="w-[80%]">
                <div className="flex gap-x-2 ">
                  <h1 className="font-bold ">Duration </h1>
                  <p>{data?.courseDuration} Month</p>
                </div>
                <div className="flex gap-x-2">
                  <h1 className="font-bold  ">Class </h1>
                  <p>{data?.courseClassNumber} </p>
                </div>
                {data?.courseProjectNumber && (
                  <div className="flex gap-x-2 ">
                    <h1 className="font-bold ">Project</h1>
                    <p>{data?.courseProjectNumber} </p>
                  </div>
                )}
              </div>
              <div className=" flex items-start justify-end ">
                <p className="text-[20px] text-right text-red-500 font-bold flex flex-col justify-start ">
                  <span className="relative left-[3px]">
                    <span className="bg-red-500 rounded-md text-white px-2 animPercent">
                      {data?.courseDiscount}%
                    </span>{" "}
                    {/* Discount */}
                  </span>
                  <span className="flex justify-end relative">
                    <span className="myLineThrough"></span>
                    <span className="text-black ">OFF</span>
                  </span>
                </p>
              </div>
            </div>
            <Link to={`/course-detail/${courseId}`}>
              <div className="w-[160px]  py-4 bg-white font-semibold text-black text-center text-[16px] shadow-md shadow-gray-700 absolute right-3 bottom-[10px] rounded-lg flex justify-center items-center gap-2">
                <p> বিস্তারিত দেখি</p>
                <span>
                  <KeyboardDoubleArrowRightIcon />{" "}
                </span>
              </div>
            </Link>
          </div>
        ) : (
          <div className="relative h-[120px] md:h-[160px] w-full flex items-center justify-center p-4 overflow-hidden">
            {/* Animated glowing gradient background */}
            <div className="absolute inset-0 z-0">
              <motion.div
                initial={{ x: -150, y: -150 }}
                animate={{ x: [0, 100, -100, 0], y: [0, 100, -100, 0] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-[300px] h-[300px]  rounded-full blur-[100px] "
              />
              <motion.div
                initial={{ x: 100, y: -100 }}
                animate={{ x: [0, -120, 120, 0], y: [0, 120, -120, 0] }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-[250px] h-[250px]  rounded-full blur-[90px]"
              />
            </div>

            {/* Foreground content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative z-10     rounded-2xl  px-6 py-5 w-full max-w-sm flex flex-col items-center"
            >
              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-teal-400 rounded-xl flex items-center justify-center shadow-md mb-4"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500 mb-1 text-center"
              >
                Coming Soon
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-sm text-gray-800 text-center mb-3"
              >
                Premium course in development. Stay tuned.
              </motion.p>

              {/* Progress bar */}
              <motion.div
                className="w-full h-2 bg-gray-300/40 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-teal-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseBox;
