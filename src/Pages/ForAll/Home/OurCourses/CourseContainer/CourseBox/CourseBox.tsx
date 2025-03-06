import { Link } from "react-router";
import { TCourseBox } from "../../../../../../utils/types/globalTypes";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
interface IProps {
  data: TCourseBox;
  number: number;
}
const CourseBox = ({ data, number }: IProps) => {
  const { courseId, courseTitle, courseImage } = data;

  return (
    <div
      className={`flex flex-col gap-y-4  rounded-md border-[4px] shadow-md shadow-gray-700   ${
        number % 2
          ? "bg-[#EDECFA] border-[#EDECFA]"
          : "bg-[#9FD5D7]  border-[#9FD5D7]"
      }`}
    >
      <img
        src={courseImage}
        alt=""
        className="w-[960px] h-[180px] rounded-md object-cover"
      />
      <div className={`px-4  h-[200px] relative`}>
        <h1 className="text-2xl text-left font-bold text-black">
          {" "}
          {courseTitle}{" "}
        </h1>
        <Link to={`/course-detail/${courseId}`}>
          <div className="w-[180px]  py-4 bg-white font-semibold text-black text-center text-[16px] shadow-md shadow-gray-700 absolute right-4 bottom-5 rounded-lg flex justify-center items-center gap-2">
            <p> বিস্তারিত দেখি</p>
            <span>
              <KeyboardDoubleArrowRightIcon />{" "}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourseBox;
