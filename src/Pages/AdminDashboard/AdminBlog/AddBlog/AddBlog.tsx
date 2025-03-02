import { ChangeEvent, useState } from "react";
import { blogCategories } from "../../../../utils/Array/blogCategoryArray";
import { useAddBlogMutation } from "../../../../redux/api/features/Blog/blogManagementApi";
import { toast } from "sonner";
import TextEditor from "../TextEditor/TextEditor";
import { sonarId } from "../../../../utils/Fucntion/sonarId";

const AddBlog = () => {
  const [addBlog] = useAddBlogMutation();
  const [category, setCategory] = useState("");

  const [content, setContent] = useState<string>(
    " <p>Welcome to Blog Text Editor!</p>"
  );
  // console.log("Content: ", content);

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
    const formData = { title, content, image, category, writer };
    console.log("Form Data: ", formData);
    toast.loading("Inserting Blog", { id: sonarId });
    const res = await addBlog(formData).unwrap();
    console.log("Res: ", res);
    if (res?.success) {
      toast.success("Blog Added Successfully", { id: sonarId });
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
            name="titlee"
            placeholder="Enter blog title"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            required
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
