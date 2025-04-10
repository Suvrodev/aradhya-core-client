import { Link } from "react-router";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import { useGetAllBlogByInstructorQuery } from "../../../redux/api/features/Blog/blogManagementApi";
import { useAppSelector } from "../../../redux/hook";
import { verifyToken } from "../../../utils/Fucntion/verifyToken";
import { TBlog } from "../../../utils/types/globalTypes";
import BlogBox from "../../AdminDashboard/AdminBlog/AllBlog/BlogBox";
import { motion } from "framer-motion";

const InstructorBlog = () => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data, isLoading } = useGetAllBlogByInstructorQuery(user?.email);
  const blogDatas = data?.data;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="relative w-full p-4 md:p-8 rounded-2xl  overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: -100, y: -100 }}
          animate={{ x: [0, 100, 0], y: [0, 100, 0] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px]"
        />
        <motion.div
          initial={{ x: -50, y: -150 }}
          animate={{ x: [0, -100, 0], y: [0, 150, 0] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-[400px] h-[400px] bg-teal-600/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="mb-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 mb-3">
            Instructor Blog
          </h2>
        </div>

        {blogDatas?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-[500px]"
          >
            <div className="relative max-w-md w-full">
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 to-teal-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
              <div className="relative p-10 bg-gray-900/80 border border-gray-800 rounded-xl backdrop-blur-lg">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-teal-500 to-purple-600 rounded-2xl flex items-center justify-center"
                >
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </motion.div>
                <h3 className="text-3xl font-bold text-center text-white mb-2">
                  Your Blog Canvas Awaits
                </h3>
                <p className="text-gray-400 text-center mb-8">
                  Begin your journey as an educator by creating your first
                  masterpiece
                </p>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/instructor-dashboard/add-blog"
                    className="relative overflow-hidden group flex items-center justify-center gap-3 py-4 px-10 w-full bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl text-white font-semibold shadow-lg"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      Compose First Blog
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogDatas?.map((data: TBlog, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative h-full bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm">
                  <BlogBox blog={data} instructor={true} />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: blogDatas.length * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to="/instructor-dashboard/add-blog"
                className="h-[400px] flex flex-col items-center justify-center min-h-[350px] border-2 border-dashed border-gray-700 hover:border-teal-400 rounded-2xl p-8 group transition-all duration-300 hover:bg-gray-900/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 w-20 h-20 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-teal-500 group-hover:to-purple-600 rounded-full mb-6 transition-all duration-500 shadow-lg">
                  <svg
                    className="w-10 h-10 text-gray-400 group-hover:text-white transition-all duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
                <h3 className="relative z-10 text-xl font-semibold text-white transition-all duration-300">
                  New Blog Creation
                </h3>
                <p className="relative z-10 text-sm text-black mt-2 transition-all duration-300">
                  Unleash your next educational masterpiece
                </p>
                <div className="relative z-10 mt-6 px-6 py-2 bg-gray-800 text-teal-400 text-sm font-medium rounded-full group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                  Start Writing
                </div>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorBlog;
