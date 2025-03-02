import LoadingPage from "../../../../Component/LoadingPage/LoadingPage";
import { useGetALlBlogQuery } from "../../../../redux/api/features/Blog/blogManagementApi";
import { TBlog } from "../../../../utils/types/globalTypes";
import BlogBox from "./BlogBox";

const AllBlog = () => {
  const { data, isLoading } = useGetALlBlogQuery(undefined);
  const blogDatas = data?.data;
  console.log(blogDatas);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="w-full p-2 md:p-8 rounded-xl shadow-2xl transform transition-all hover:shadow-3xl">
      <h2 className="text-3xl font-extrabold mb-6 text-white text-center">
        All Blog
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        {blogDatas?.map((data: TBlog, idx: number) => (
          <BlogBox key={idx} blog={data} admin={true} />
        ))}
      </div>
    </div>
  );
};

export default AllBlog;
