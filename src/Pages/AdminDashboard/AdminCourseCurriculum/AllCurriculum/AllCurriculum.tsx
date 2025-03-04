import { ChangeEvent, useState } from "react";
import { useGetAllCourseQuery } from "../../../../redux/api/features/Course/courseManagementApi";
import { TCourse, TCurriculum } from "../../../../utils/types/globalTypes";
import {
  useDeleteCurriculumMutation,
  useGetSpecificCurriculumQuery,
} from "../../../../redux/api/features/Curriculum/curriculumManagementApi";
import DeleteComponent from "../../../../Component/DeleteComponent/DeleteComponent";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";

const AllCurriculum = () => {
  const [deleteCurriculum] = useDeleteCurriculumMutation();
  const { data, isLoading } = useGetAllCourseQuery(undefined);
  const allCourses = data?.data;
  const [courseId, setCourseId] = useState("c-101");
  const handleCourseId = (event: ChangeEvent<HTMLSelectElement>) => {
    const courseId = event?.target?.value;
    setCourseId(courseId);
  };
  // console.log("Selected Course id in get Curriculum ", courseId);

  const { data: curriculumData } = useGetSpecificCurriculumQuery(courseId);
  const curriculums = curriculumData?.data;
  // console.log("Curriculum: ", curriculums);

  const handleDeleteCurriculum = async (id: string) => {
    console.log("Delete id: ", id);
    toast.loading("Deleting", { id: sonarId });
    const res = await deleteCurriculum(id).unwrap();
    console.log("Res: ", res);
    if (res?.status) {
      toast.success("Deleted", { id: sonarId });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1 className="text-xl font-bold">All Curriculum</h1>

      <div>
        <h1 className="block mb-4 text-sm font-medium">Under Course</h1>
        <select
          name=""
          value={courseId}
          onChange={handleCourseId}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
        >
          <option value="" disabled>
            Select Course
          </option>
          {allCourses?.map((data: TCourse, idx: number) => (
            <option key={idx} value={data?.courseId}>
              {data?.courseId}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-4 py-4 h-[450px] overflow-auto">
        {curriculums?.map((data: TCurriculum, idx: number) => (
          <div key={idx} className="border py-4 px-4 rounded-md relative">
            <p>{data?.title}</p>
            <p>
              <span>Course Code: {data?.courseId} </span>
            </p>
            <p>{data?.order}</p>
            <div className="absolute top-2 right-2">
              <div onClick={() => handleDeleteCurriculum(data?._id)}>
                <DeleteComponent />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCurriculum;
