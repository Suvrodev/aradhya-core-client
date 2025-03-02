import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { blogTypes } from "../../../../utils/Array/blogTypeArray";
import { useAddBlogMutation } from "../../../../redux/api/features/Blog/blogManagementApi";
import { toast } from "sonner";

const AddBlog = () => {
  const [addBlog] = useAddBlogMutation();
  const editor = useRef(null);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    writer: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Blog Data:", blog);
    setBlog({ title: "", content: "", image: "", category: "", writer: "" });
    toast.loading("Inserting Blog");
    const res = await addBlog(blog).unwrap();
    console.log("Res: ", res);
    if (res?.success) {
      toast.success("Blog Added Successfully");
    }
  };

  return (
    <div className="w-full p-2 md:p-8 rounded-xl shadow-2xl transform transition-all hover:shadow-3xl">
      <h2 className="text-3xl font-extrabold mb-6 text-white text-center">
        Add a New Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Title</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            required
          />
        </div>

        {/* Jodit Editor for Content */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Content</label>
          <JoditEditor
            ref={editor}
            value={blog.content}
            onChange={(newContent) => setBlog({ ...blog, content: newContent })}
            className="border text-black border-gray-300 rounded-lg overflow-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Image URL</label>
          <input
            type="text"
            name="image"
            value={blog.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Category</label>
          <select
            name="category"
            value={blog.category}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            required
          >
            <option value="">Select Category</option>
            {blogTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
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
            value={blog.writer}
            onChange={handleChange}
            placeholder="Enter writer's name"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
