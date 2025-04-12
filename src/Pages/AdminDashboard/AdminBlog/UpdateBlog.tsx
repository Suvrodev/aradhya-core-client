import { useParams } from "react-router";
import {
  useGetSpecificBlogQuery,
  useUpdateBlogMutation,
} from "../../../redux/api/features/Blog/blogManagementApi";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import { toast } from "sonner";
import { ChangeEvent, useEffect, useState } from "react";
import TextEditor from "./TextEditor/TextEditor";
import { blogCategories } from "../../../utils/Array/blogCategoryArray";
import { TBlog } from "../../../utils/types/globalTypes";
import { sonarId } from "../../../utils/Fucntion/sonarId";

const UpdateBlog = () => {
  const [updateBlog] = useUpdateBlogMutation();
  const { id } = useParams();
  // console.log("id: ", id);
  const { data, isLoading } = useGetSpecificBlogQuery(id);
  const blog: TBlog = data?.data;
  // console.log("Blog: ", blog);

  const [category, setCategory] = useState(blog?.category);
  const [content, setContent] = useState<string>(blog?.content);
  console.log("Content: ", content);
  useEffect(() => {
    if (blog) {
      setCategory(blog?.category);
      setContent(blog?.content);
    }
  }, [blog]);

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const data = e.target.value;
    setCategory(data);
    // console.log("Data: ", data);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Blog Data:");
    const Form = event.target as HTMLFormElement;
    const title = Form.titlee.value;
    const image = Form.image.value;
    const writer = Form.writer.value;
    const updateData = { title, content, image, category, writer };
    console.log("Form Data: ", updateData);
    toast.loading("Updating Blog", { id: sonarId });
    const res = await updateBlog({ id, updateData }).unwrap();
    console.log("Res------------: ", res);
    if (res?.success) {
      toast.success("Blog Updated Successfully", { id: sonarId });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="w-full p-2 md:p-8 rounded-xl shadow-2xl transform transition-all hover:shadow-3xl">
      <h2 className="text-3xl font-extrabold mb-6 text-white text-center">
        Update Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Title</label>
          <input
            type="text"
            name="titlee"
            placeholder="Enter blog title"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            required
            defaultValue={blog?.title}
          />
        </div>

        {/* Jodit Editor for Content */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Content</label>
          <TextEditor content={content} setContent={setContent} />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            defaultValue={blog?.image}
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Category</label>
          <select
            name="category"
            value={category}
            onChange={handleCategory}
            required
            className="w-full h-[65px] px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
          >
            <option value="" disabled>
              Select Category
            </option>
            {blogCategories.map((data, idx) => (
              <option key={idx} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>

        {/* Writer Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Writer Name</label>
          <input
            type="text"
            name="writer"
            placeholder="Enter writer's name"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            defaultValue={blog?.writer}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
