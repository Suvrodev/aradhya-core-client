import { Link, useLocation, useNavigate } from "react-router";
import {
  useDeleteBlogMutation,
  useUpdateBlogisEnableMutation,
  useUpdateBlogPinMutation,
} from "../../../../redux/api/features/Blog/blogManagementApi";
import { TBlog } from "../../../../utils/types/globalTypes";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import { formatDate } from "../../../../utils/Fucntion/convertDate";
import { Trash2, CodeXml } from "lucide-react";

interface IProps {
  blog: TBlog;
  admin?: boolean;
}

const BlogBox = ({ blog, admin = false }: IProps) => {
  console.log("Blog: ", blog);
  const [deleteBlog] = useDeleteBlogMutation();
  const [updatePin] = useUpdateBlogPinMutation();
  const [updateIsEnable] = useUpdateBlogisEnableMutation();
  const { _id, title, image, category, writer, pin, isEnable } = blog;
  const [trimmedTitle, setTrimmedTitle] = useState("");
  const path = useLocation()?.pathname;
  const navigate = useNavigate();

  // For AOS
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  useEffect(() => {
    const result = title.length > 50 ? title.substring(0, 50) + "..." : title;
    setTrimmedTitle(result);
  }, [title]);

  const handleDelete = async (id: string) => {
    console.log(`Deleting blog with ID: ${id}`);
    toast.loading("Deleting", { id: sonarId });
    try {
      const res = await deleteBlog(id).unwrap();
      console.log("Res: ", res);
      if (res?.success) {
        toast.success(res?.message, { id: sonarId });
      }
    } catch {
      toast.error("Something is wrong", { id: sonarId });
    }
  };

  const handleGoBlogDetail = (_id: string) => {
    if (path != "/blog") {
      console.log("in admin or Home");
      return;
    }
    navigate(`/blog/${_id}`);
  };

  const handlepin = async (id: string) => {
    const updateData = { pin: "yes" };
    toast.loading("Pinning", { id: sonarId });
    const res = await updatePin({ id, updateData }).unwrap();
    if (res?.success) {
      toast.success("Made Pin", { id: sonarId });
    }
  };

  const handleUnpin = async (id: string) => {
    const updateData = { pin: "no" };
    toast.loading("Pinning", { id: sonarId });
    const res = await updatePin({ id, updateData }).unwrap();
    if (res?.success) {
      toast.success("Made UnPin", { id: sonarId });
    }
  };

  const handleMakeBlogEnable = async (id: string) => {
    const updateData = { isEnable: "yes" };
    toast.loading("Enabling", { id: sonarId });
    const res = await updateIsEnable({ id, updateData }).unwrap();
    if (res?.success) {
      toast.success("Made Enable", { id: sonarId });
    }
  };
  const handleMakeBlogDisable = async (id: string) => {
    const updateData = { isEnable: "no" };
    toast.loading("Disableing", { id: sonarId });
    const res = await updateIsEnable({ id, updateData }).unwrap();
    if (res?.success) {
      toast.success("Made Disable", { id: sonarId });
    }
  };

  return (
    <div
      data-aos="flip-right"
      data-aos-anchor-placement="top-bottom"
      // className="relative bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col h-[400px]"
      className="relative bg-white  rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col h-[400px]"
      onClick={() => handleGoBlogDetail(_id)}
    >
      {/* Blog Image */}
      <div className="w-full h-48 overflow-hidden flex-shrink-0 ">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-all duration-300 hover:scale-110"
        />
      </div>

      {/* Blog Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-xl font-bold text-black/80 mb-2">{trimmedTitle}</h2>

        {/* Category and Writer */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-block bg-teal-500 text-white text-xs px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="inline-block bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
            By {writer}
          </span>
        </div>
        {admin && (
          <div className="flex gap-x-2">
            <Link to={`/blog/${_id}`}>
              <button className="flex items-center gap-2 py-1 px-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-700 text-white font-medium transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Detail
              </button>
            </Link>
            {isEnable == "yes" ? (
              <button
                onClick={() => handleMakeBlogDisable(_id)}
                className="flex items-center gap-1 py-1 px-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg hover:shadow-md hover:from-green-600 hover:to-green-700 text-white text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Enable
              </button>
            ) : (
              <button
                onClick={() => handleMakeBlogEnable(_id)}
                className="flex items-center gap-1 py-1 px-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg hover:shadow-md hover:from-red-600 hover:to-red-700 text-white text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Disable
              </button>
            )}
          </div>
        )}

        {/* Date */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <span className="bg-green-500 rounded-md py-1 px-3 text-white">
              Date:
            </span>
            <span className="text-black">{formatDate(blog?.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons (Admin Only) */}
      {admin && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-colors ${
              pin === "yes"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            {pin === "yes" ? (
              <span onClick={() => handleUnpin(_id)}>📌</span>
            ) : (
              <span onClick={() => handlepin(_id)}>📍</span>
            )}
          </div>

          <Link
            to={`/admin-dashboard/update-blog/${_id}`}
            className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full shadow-md hover:bg-green-600 transition-colors"
          >
            <CodeXml className="text-white" size={20} />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              handleDelete(_id);
            }}
            className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full shadow-md hover:bg-red-600 transition-colors"
          >
            <Trash2 className="text-white" size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogBox;
