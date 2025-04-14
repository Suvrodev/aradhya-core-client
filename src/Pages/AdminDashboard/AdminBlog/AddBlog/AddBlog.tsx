// import { ChangeEvent, useState } from "react";
// import { blogCategories } from "../../../../utils/Array/blogCategoryArray";
// import { useAddBlogMutation } from "../../../../redux/api/features/Blog/blogManagementApi";
// import { toast } from "sonner";
// import TextEditor from "../TextEditor/TextEditor";
// import { sonarId } from "../../../../utils/Fucntion/sonarId";
// import { useAppSelector } from "../../../../redux/hook";
// import { verifyToken } from "../../../../utils/Fucntion/verifyToken";
// import { useTitle } from "../../../../Component/hook/useTitle";

// const AddBlog = () => {
//   useTitle("Admin-Add Blog");
//   const { token } = useAppSelector((state) => state.auth);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   let user: any;
//   if (token) {
//     user = verifyToken(token);
//   }

//   console.log("Logged user in blog: ", user);

//   const [addBlog] = useAddBlogMutation();
//   const [category, setCategory] = useState("");

//   const [content, setContent] = useState<string>(
//     " <p>Welcome to Blog Text Editor!</p>"
//   );
//   // console.log("Content: ", content);

//   const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
//     const data = e.target.value;
//     setCategory(data);
//     // console.log("Data: ", data);
//   };

//   // Handle form submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     console.log("Blog Data:");
//     const Form = event.target as HTMLFormElement;
//     const title = Form.titlee.value;
//     const image = Form.image.value;
//     const writer = Form.writer.value;
//     const writerId = user?.studentId;
//     const writerEmail = user?.email;
//     const formData = {
//       title,
//       content,
//       image,
//       category,
//       writer,
//       writerId,
//       writerEmail,
//     };
//     console.log("Form Data: ", formData);
//     toast.loading("Inserting Blog", { id: sonarId });
//     const res = await addBlog(formData).unwrap();
//     console.log("Res: ", res);
//     if (res?.success) {
//       toast.success("Blog Added Successfully", { id: sonarId });
//     }
//   };

//   return (
//     <div className="w-full p-2 md:p-8 rounded-xl shadow-2xl transform transition-all hover:shadow-3xl">
//       <h2 className="text-3xl font-extrabold mb-6 text-white text-center">
//         Add a New Blog
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Title */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-white">Title</label>
//           <input
//             type="text"
//             name="titlee"
//             placeholder="Enter blog title"
//             className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
//             required
//           />
//         </div>

//         {/* Jodit Editor for Content */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-white">Content</label>
//           <TextEditor content={content} setContent={setContent} />
//         </div>

//         {/* Image URL */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-white">Image URL</label>
//           <input
//             type="text"
//             name="image"
//             placeholder="Enter image URL"
//             className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
//             required
//           />
//         </div>

//         {/* Category Dropdown */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-white">Category</label>
//           <select
//             name="category"
//             value={category}
//             onChange={handleCategory}
//             required
//             className="w-full h-[65px] px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
//           >
//             <option value="" disabled>
//               Select Category
//             </option>
//             {blogCategories.map((data, idx) => (
//               <option key={idx} value={data}>
//                 {data}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Writer Name */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-white">Writer Name</label>
//           <input
//             type="text"
//             name="writer"
//             placeholder="Enter writer's name"
//             className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
//         >
//           Add Blog
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBlog;

/**
 * 2nd version
 */

import { ChangeEvent, useState } from "react";
import { blogCategories } from "../../../../utils/Array/blogCategoryArray";
import { useAddBlogMutation } from "../../../../redux/api/features/Blog/blogManagementApi";
import { toast } from "sonner";
import TextEditor from "../TextEditor/TextEditor";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import { useAppSelector } from "../../../../redux/hook";
import { verifyToken } from "../../../../utils/Fucntion/verifyToken";
import { useTitle } from "../../../../Component/hook/useTitle";
import axios from "axios";
import { Camera } from "lucide-react";

const imageHostingUrl = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDNARY_API_KEY
}/image/upload`;

const AddBlog = () => {
  useTitle("Admin-Add Blog");
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const [addBlog] = useAddBlogMutation();
  const [category, setCategory] = useState("");
  const [content, setContent] = useState<string>(
    " <p>Welcome to Blog Text Editor!</p>"
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const data = e.target.value;
    setCategory(data);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    const Form = event.target as HTMLFormElement;
    const title = Form.titlee.value;
    const writer = Form.writer.value;
    const writerId = user?.studentId;
    const writerEmail = user?.email;

    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", import.meta.env.VITE_ClOUDNARY_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUDNARY_API_KEY);

    try {
      toast.loading("Uploading Image", { id: sonarId });
      const imageResponse = await axios.post(imageHostingUrl, formData);
      const imageUrl = imageResponse.data.url;

      const blogData = {
        title,
        content,
        image: imageUrl,
        category,
        writer,
        writerId,
        writerEmail,
      };

      toast.loading("Inserting Blog", { id: sonarId });
      const res = await addBlog(blogData).unwrap();

      if (res?.success) {
        toast.success("Blog Added Successfully", { id: sonarId });
        // Reset form
        Form.reset();
        setContent(" <p>Welcome to Blog Text Editor!</p>");
        setCategory("");
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add blog", { id: sonarId });
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

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Blog Image</label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
            >
              <Camera className="text-teal-500" />
              <span>Choose Image</span>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <div className="w-20 h-20 rounded-md overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
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
