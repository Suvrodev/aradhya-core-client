import "./CourseBox.css";
import { Link } from "react-router";
import { TCourseBox } from "../../../../../../utils/types/globalTypes";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
interface IProps {
  data: TCourseBox;
  number: number;
}
const CourseBox = ({ data, number }: IProps) => {
  // console.log("Course data: ", data);
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
          {courseTitle}
        </h1>
        <div className="mt-2 text-black text-[15px]  flex gap-x-4 ">
          <div className="w-[80%]">
            <div className="flex gap-x-2 ">
              <h1 className="font-bold ">Duration </h1>
              <p>{data?.courseDuration} Month</p>
            </div>
            <div className="flex gap-x-2">
              <h1 className="font-bold  ">Class </h1>
              <p>{data?.courseClassNumber} </p>
            </div>
            <div className="flex gap-x-2 ">
              <h1 className="font-bold ">Project</h1>
              <p>{data?.courseProjectNumber} </p>
            </div>
          </div>
          <div className=" flex items-start justify-end ">
            <p className="text-[20px] text-right text-red-500 font-bold flex flex-col justify-start ">
              <span className="flex justify-end relative">
                <span className="myLineThrough"></span>
                <span className="text-black ">OFF</span>
              </span>
              <span className="relative left-[3px]">
                <span className="bg-red-500 rounded-md text-white px-2 animPercent">
                  {data?.courseDiscount} %
                </span>{" "}
                Discount
              </span>
            </p>
          </div>
        </div>
        <Link to={`/course-detail/${courseId}`}>
          <div className="w-[180px]  py-4 bg-white font-semibold text-black text-center text-[16px] shadow-md shadow-gray-700 absolute right-3 bottom-[10px] rounded-lg flex justify-center items-center gap-2">
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
