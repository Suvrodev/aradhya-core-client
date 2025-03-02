import { useLocation, useNavigate } from "react-router";
import { useDeleteBlogMutation } from "../../../../redux/api/features/Blog/blogManagementApi";
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
  const [deleteBlog] = useDeleteBlogMutation();
  const { _id, title, image, category, writer } = blog;
  const [trimmedTitle, setTrimmedTitle] = useState("");
  const path = useLocation()?.pathname;
  const navigate = useNavigate();

  //For AOS
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
      if (res?.status) {
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

  return (
    <div
      data-aos="flip-right"
      data-aos-anchor-placement="top-bottom"
      className="relative bg-purple-500 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl py-2"
      onClick={() => handleGoBlogDetail(_id)}
    >
      {/* Blog Image */}
      <div className="w-full px-4 h-48 ">
        <img
          src={image}
          alt=""
          className="w-full h-[192px] object-center mx-auto rounded-md"
        />
      </div>

      {/* Blog Content */}
      <div className="p-4 ">
        <h2 className="text-[16px] font-bold text-white">{trimmedTitle}</h2>
        {/* Category Section */}
        <div className="w-50 mt-4">
          <div className="flex flex-col gap-2 items-start ">
            <div className="flex gap-x-2">
              <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {category}
              </span>
              <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full my-auto">
                {writer}
              </span>
            </div>
            <div className="flex gap-x-2 items-center">
              <div className="flex gap-x-2 items-center">
                <span className="bg-green-500 rounded-md py-1 px-4 text-white">
                  Date:
                </span>
                <span>{formatDate(blog?.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {admin && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="w-[40px] h-[40px] flex items-center justify-center bg-green-500 rounded-full shadow-md hover:bg-green-600 transition-colors">
            <CodeXml />
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="w-[40px] h-[40px] flex items-center justify-center bg-red-500 rounded-full shadow-md hover:bg-red-600 transition-colors"
          >
            <Trash2 className="text-white font-bold" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogBox;
