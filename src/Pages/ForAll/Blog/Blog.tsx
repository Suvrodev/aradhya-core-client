import { useTitle } from "../../../Component/hook/useTitle";
import { useGetALlBlogQuery } from "../../../redux/api/features/Blog/blogManagementApi";
import { TBlog } from "../../../utils/types/globalTypes";
import BlogBox from "../../AdminDashboard/AdminBlog/AllBlog/BlogBox";
import BlogBoxSkl from "../../AdminDashboard/AdminBlog/AllBlog/BlogBoxSkl";

const Blog = () => {
  useTitle("Blog");
  const { data: blogDatas, isLoading } = useGetALlBlogQuery(undefined);
  const blogs = blogDatas?.data;
  // console.log("Blog Data: ", blogs);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-[#262F51] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">All Blogs</h2>
          <p className="text-lg text-white/80">
            Explore our latest blogs on technology, design, and innovation.
          </p>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <BlogBoxSkl />
            <BlogBoxSkl />
            <BlogBoxSkl />
            <BlogBoxSkl />
          </div>
        ) : (
          <div>
            {" "}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
