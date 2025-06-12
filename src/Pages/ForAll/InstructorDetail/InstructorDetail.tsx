import "./InstructorDetail.css";
import { useParams } from "react-router";
import { useGetSpecificOurPeopleQuery } from "../../../redux/api/features/OurPeople/ourPeopleManagementApi";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import {
  FaYoutube,
  FaLink,
  FaGraduationCap,
  FaBriefcase,
  FaChalkboardTeacher,
  FaExternalLinkAlt,
} from "react-icons/fa";
import ReactPlayer from "react-player/youtube";
import { TOurPeople } from "../../../utils/types/globalTypes";
import { motion } from "framer-motion";
import { useTitle } from "../../../Component/hook/useTitle";

const InstructorDetail = () => {
  useTitle("Instructor Detail");
  const { instructorId } = useParams();
  const { data, isLoading } = useGetSpecificOurPeopleQuery(instructorId);
  const instructor: TOurPeople = data?.data;

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!instructor) {
    return (
      <div className="bg-gradient-to-br from-teal-500 to-[#262F51] min-h-screen flex items-center justify-center text-white">
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">Instructor not found</h2>
          <p className="mt-4 text-xl">
            The requested instructor could not be located
          </p>
        </div>
      </div>
    );
  }

  const parseData = (str: string) => {
    if (!str) return [];
    return str
      .split("#")
      .map((item) => item.trim())
      .filter((item) => item);
  };

  return (
    <div className="bg-gradient-to-br from-teal-500 to-[#262F51] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 text-white">
          <motion.h1
            className="text-5xl font-extrabold tracking-tight mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {instructor.name.trim()}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-semibold italic text-teal-100 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {instructor.designation}
          </motion.p>

          {instructor.course && (
            <motion.div
              className="mt-2 inline-flex items-center px-5 py-2.5 rounded-full relative overflow-hidden group border border-teal-500/50 backdrop-blur-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-700/30 to-teal-500/20 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <FaChalkboardTeacher className="mr-2 z-10 text-teal-300" />
              <span className="font-medium z-10 bg-gradient-to-r from-teal-200 to-white bg-clip-text text-transparent">
                Teaches: {instructor.course}
              </span>
            </motion.div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/3 space-y-6">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2 text-teal-100">
                  <p>
                    <span className="font-medium text-white">Email:</span>{" "}
                    {instructor.email}
                  </p>
                  {instructor.portfolio && (
                    <div className="mt-4">
                      <motion.a
                        href={instructor.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center group relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                        <div className="relative px-4 py-2 bg-teal-800/50 rounded-lg flex items-center border border-teal-400/20 group-hover:border-teal-400/50 transition-all duration-300">
                          <FaLink className="mr-2 text-teal-300 group-hover:text-white transition-colors" />
                          <span className="font-medium text-teal-100 group-hover:text-white transition-colors">
                            View Portfolio
                          </span>
                          <FaExternalLinkAlt className="ml-2 text-xs opacity-70 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Specialized Area */}
            {instructor.specializedArea && (
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  Specialized Area
                </h3>
                <div className="flex flex-wrap gap-3">
                  {parseData(instructor.specializedArea).map((item, index) => (
                    <motion.span
                      key={index}
                      className="bg-teal-500/20 text-teal-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-500/30 transition-colors cursor-default"
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:w-2/3 space-y-6">
            {/* Education */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-teal-500/20 p-3 rounded-lg mr-4">
                  <FaGraduationCap className="w-6 h-6 text-teal-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">Education</h2>
              </div>
              <ul className="space-y-4 pl-4">
                {parseData(instructor.education).map((item, index) => (
                  <motion.li
                    key={index}
                    className="relative pl-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="absolute left-0 top-2 w-2 h-2 bg-teal-400 rounded-full"></div>
                    <p className="text-teal-100 whitespace-pre-line hover:text-white transition-colors">
                      {item}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Work Experience */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-teal-500/20 p-3 rounded-lg mr-4">
                  <FaBriefcase className="w-6 h-6 text-teal-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Work Experience
                </h2>
              </div>
              <ul className="space-y-4">
                {parseData(instructor.workExperience).map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 * index }}
                  >
                    <div className="flex-shrink-0 mt-1 mr-4">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg flex-1 hover:bg-white/10 transition-colors">
                      <p className="text-teal-100 whitespace-pre-line hover:text-white">
                        {item}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* YouTube Video - Bottom Full Width */}
        {instructor.youtube && (
          <motion.div
            className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaYoutube className="text-red-500 text-xl mr-2" />
                <h3 className="text-lg font-semibold text-white">
                  Featured Content
                </h3>
              </div>
              <div className="w-full aspect-video rounded-xl overflow-hidden">
                <ReactPlayer
                  url={instructor.youtube}
                  controls={true}
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "0.75rem", overflow: "hidden" }}
                />
              </div>
              <motion.a
                href={instructor.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm text-teal-300 hover:text-white transition-colors"
                whileHover={{ x: 5 }}
              >
                Watch on YouTube
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InstructorDetail;
