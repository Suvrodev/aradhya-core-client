import { ChangeEvent, useState } from "react";
import { useGetSpecificBatchUnderCourseQuery } from "../../../../redux/api/features/Batch/batchManagementApi";
import { useGetAllCourseQuery } from "../../../../redux/api/features/Course/courseManagementApi";
import { TBatch, TCourse } from "../../../../utils/types/globalTypes";
import AllBatchBox from "./AllBatchBox";

const AllBatch = () => {
  const { data: courseData, isLoading: courseLoading } =
    useGetAllCourseQuery(undefined);
  const courses = courseData?.data;
  //   console.log("Courses: ", courses);

  const [selectCourse, setSelectCourse] = useState("cg-201");
  const handleCourse = (event: ChangeEvent<HTMLSelectElement>) => {
    const res = event?.target?.value;
    setSelectCourse(res);
  };
  console.log("Select Course: ", selectCourse);

  const { data, isLoading } = useGetSpecificBatchUnderCourseQuery(selectCourse);
  const batchData = data?.data;
  console.log("Batch: ", batchData);

  if (isLoading || courseLoading) {
    return <p>Loading Batch...</p>;
  }
  return (
    <div className="h-[950px] overflow-auto ">
      <h1 className="text-xl font-bold">All Batch</h1>

      <select
        className="bg-purple-500 text-white  px-4 py-2 mb-4 rounded-md"
        onChange={handleCourse}
        value={selectCourse}
      >
        {courses?.map((data: TCourse, idx: number) => (
          <option value={data?.courseId} key={idx}>
            {data?.courseTitle}
          </option>
        ))}
      </select>

      <div className="flex flex-col gap-4">
        {batchData?.map((data: TBatch, idx: number) => (
          <AllBatchBox key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default AllBatch;
