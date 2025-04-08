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
      <h1 className="text-xl font-bold text-center mt-4">All Batch</h1>

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

      {/* <div className="flex flex-col gap-4">
        {batchData?.map((data: TBatch, idx: number) => (
          <AllBatchBox key={idx} data={data} />
        ))}
      </div> */}

      <div className=" overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-0 md:p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-teal-500">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">batchId</th>
              <th className="py-3 px-4 text-left">batchName</th>
              <th className="py-3 px-4 text-left">Under Course</th>
              <th className="py-3 px-4 text-left">Course Name</th>
              <th className="py-3 px-4 text-left">Batch Status</th>
              <th className="py-3 px-4 text-left">Class Number</th>
              <th className="py-3 px-4 text-left">Project Number</th>
              <th className="py-3 px-4 text-left">Instructor ID</th>
              <th className="py-3 px-4 text-left">Instructor Name</th>
              <th className="py-3 px-4 text-left">Instructor Image</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">End Date</th>
              <th className="py-3 px-4 text-left">Update</th>
              <th className="py-3 px-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {batchData?.map((data: TBatch, idx: number) => (
              <AllBatchBox key={idx} data={data} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBatch;
