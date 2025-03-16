import { useGetCourseUnderServiceQuery } from "../../../../redux/api/features/Course/courseManagementApi";
import { TCourse, TService } from "../../../../utils/types/globalTypes";
import CourseBox from "../../Home/OurCourses/CourseContainer/CourseBox/CourseBox";

interface IProps {
  data: TService;
}
const AllCourseServiceSection = ({ data }: IProps) => {
  console.log("data: ", data);

  const { data: courseData, isLoading } = useGetCourseUnderServiceQuery(
    data?.serviceId
  );
  const allCourses = courseData?.data;

  console.log("All Courses: ", allCourses);
  if (isLoading) {
    return <p> Loading... </p>;
  }
  return (
    <div>
      <h1 className="text-center text-xl font-bold underline underline-offset-2 mb-6">
        {data?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4 rounded-lg border-[4px] border-white  innerShadw p-6">
        {allCourses?.map((data: TCourse, idx: number) => (
          <CourseBox key={idx} data={data} number={idx + 1} />
        ))}
      </div>
    </div>
  );
};

export default AllCourseServiceSection;
