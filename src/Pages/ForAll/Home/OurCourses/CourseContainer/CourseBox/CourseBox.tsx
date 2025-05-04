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
          <div className="relative h-[120px] md:h-[160px] w-full flex items-center justify-center overflow-hidden bg-white/10">
            {/* Subtle horizontal animation bars */}
            <div className="absolute inset-0 flex flex-col justify-center space-y-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-[1px] bg-gradient-to-r from-transparent via-teal-400/20 to-transparent"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    x: [i % 2 === 0 ? -100 : 100, 0, i % 2 === 0 ? 100 : -100],
                  }}
                  transition={{
                    duration: 6 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center p-4">
              {/* Professional "COMING SOON" text with left-to-right animation */}
              <div className="relative overflow-hidden">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center"
                >
                  <motion.span
                    className="text-xl font-bold tracking-widest text-gray-800"
                    animate={{
                      backgroundSize: ["100% 2px", "0% 2px", "100% 2px"],
                      backgroundPosition: ["0% 100%", "0% 100%", "100% 100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #7c3aed, #0d9488)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "0% 2px",
                      backgroundPosition: "0% 100%",
                    }}
                  >
                    COMING SOON
                  </motion.span>

                  <motion.div
                    className="ml-2 w-2 h-2 bg-teal-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>

              {/* Professional progress indicator */}
              <motion.div
                className="w-40 h-[2px] bg-gray-300/50 mt-4 relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-teal-400"
                  initial={{ width: 0 }}
                  animate={{
                    width: ["0%", "100%"],
                    left: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />

                {/* Glow effect */}
                <motion.div
                  className="absolute top-0 h-full w-10 bg-white/30"
                  animate={{
                    left: ["-10%", "110%"],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.3,
                  }}
                />
              </motion.div>

              {/* Minimal status text */}
              <motion.p
                className="text-xs text-gray-600 mt-2 tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                PREMIUM COURSE IN DEVELOPMENT
              </motion.p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseBox;
