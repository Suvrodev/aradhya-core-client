import { useParams } from "react-router";
import { useGetSpecificBlogQuery } from "../../../../../redux/api/features/Blog/blogManagementApi";
import LoadingPage from "../../../../../Component/LoadingPage/LoadingPage";

const BlogDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSpecificBlogQuery(id);

  const blog = data?.data;

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!blog) {
    return <div className="text-center text-white">Blog not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-[#262F51] py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10">
        {/* Blog Image */}
        <div className="w-full h-64 md:h-80 overflow-hidden rounded-lg mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {blog.title}
        </h1>

        {/* Blog Metadata (Category, Writer, Date) */}
        <div className="flex flex-wrap gap-4 mb-8">
          <span className="inline-block bg-teal-500 text-white text-sm px-3 py-1 rounded-full">
            {blog.category}
          </span>
          <span className="inline-block bg-purple-500 text-white text-sm px-3 py-1 rounded-full">
            By {blog.writer}
          </span>
          <span className="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded-full">
            Published: {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
            Updated: {new Date(blog.updatedAt).toLocaleDateString()}
          </span>
        </div>

        {/* Blog Content */}
        <div
          className="prose prose-invert max-w-none text-white/90"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </div>
  );
};

export default BlogDetail;
