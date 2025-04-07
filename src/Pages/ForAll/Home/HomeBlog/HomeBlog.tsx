import { Link } from "react-router";
import LoadingPage from "../../../../Component/LoadingPage/LoadingPage";
import { useGetALlBlogQuery } from "../../../../redux/api/features/Blog/blogManagementApi";
import { TBlog } from "../../../../utils/types/globalTypes";
import BlogBox from "../../../AdminDashboard/AdminBlog/AllBlog/BlogBox";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const HomeBlog = () => {
  const { data: blogDatas, isLoading } = useGetALlBlogQuery({ pin: "yes" });
  const blogs = blogDatas?.data;
  // console.log("Blog Data: ", blogs);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-[#262F51] p-4 md:p-8 rounded-md">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Show Blogs
          </h2>
          <p className="text-lg text-white/80">
            Explore our latest blogs on technology, design, and innovation.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs?.map((data: TBlog, idx: number) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transform transition-all hover:scale-105"
            >
              <BlogBox blog={data} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center items-center">
          <Link to={`blog`}>
            <div className="w-[180px]  py-4 bg-white font-semibold text-black text-center text-[16px] shadow-md shadow-gray-700 rounded-lg flex justify-center items-center gap-2">
              <p> Show All Blog</p>
              <span>
                <KeyboardDoubleArrowRightIcon />{" "}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBlog;
