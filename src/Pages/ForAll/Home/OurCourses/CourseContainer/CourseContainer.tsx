import { useGetCourseUnderServiceQuery } from "../../../../../redux/api/features/Course/courseManagementApi";
import { useAppSelector } from "../../../../../redux/hook";
import { TCourseBox } from "../../../../../utils/types/globalTypes";
import CourseBox from "./CourseBox/CourseBox";

const CourseContainer = () => {
  const { serviceId } = useAppSelector((state) => state.selectService);

  const { data: CourseData } = useGetCourseUnderServiceQuery(serviceId);
  const courses = CourseData?.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4 rounded-lg border-[4px] border-white  innerShadw p-6 ">
      {courses?.map((data: TCourseBox, idx: number) => (
        <CourseBox key={idx} data={data} number={idx + 1} />
      ))}
    </div>
  );
};

export default CourseContainer;
