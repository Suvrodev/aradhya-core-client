import { Link } from "react-router";
import { TCourseBox } from "../../../../utils/types/globalTypes";
import { Trash2, CodeXml } from "lucide-react";
import { useDeleteCourseMutation } from "../../../../redux/api/features/Course/courseManagementApi";

interface IProps {
  course: TCourseBox;
  admin?: boolean;
}
const CourseBox = ({ course }: IProps) => {
  const [deleteCourse] = useDeleteCourseMutation();
  const {
    courseId,
    courseTitle,
    courseImage,
    courseClassNumber,
    courseProjectNumber,
  } = course;

  const handleDelete = async (id: string) => {
    console.log("Delete: ", id);
    const res = await deleteCourse(id).unwrap();
    console.log("res: ", res);
  };

  return (
    <div className="max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 transform  cursor-pointer border border-[#2A3A57] relative">
      <img
        className="w-full h-[250px] object-cover"
        src={courseImage}
        alt={courseTitle}
      />

      <div className="p-6">
        <h2 className="text-xl font-bold text-black mb-2">{courseTitle}</h2>

        <p className="text-sm text-[#8A9BB8] mb-4">Course ID: {courseId}</p>

        <div className="flex justify-between items-center text-[#8A9BB8]">
          <div className="flex items-center">
            <span className="mr-2">📚</span>
            <span>{courseClassNumber} Classes</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">📂</span>
            <span>{courseProjectNumber} Projects</span>
          </div>
        </div>

        <button className="mt-6 w-full bg-gradient-to-r from-[#1E90FF] to-[#00BFFF] text-white py-2 rounded-lg font-semibold hover:from-[#00BFFF] hover:to-[#1E90FF] transition-all transform hover:scale-105">
          View Details
        </button>
      </div>

      {/* Update and Delete Buttons */}
      <div className="absolute top-2 right-2 flex space-x-2">
        {/* Update Button */}
        <Link
          to={`/admin-dashboard/update-course/${courseId}`}
          className="w-[40px] h-[40px] flex items-center justify-center bg-green-500 rounded-full shadow-md hover:bg-green-600 transition-colors"
        >
          <CodeXml />
        </Link>

        {/* Delete Button */}
        <button
          onClick={() => handleDelete(courseId)}
          className="w-[40px] h-[40px] flex items-center justify-center bg-red-500 rounded-full shadow-md hover:bg-red-600 transition-colors"
        >
          <Trash2 className="text-white font-bold" />
        </button>
      </div>
    </div>
  );
};

export default CourseBox;
