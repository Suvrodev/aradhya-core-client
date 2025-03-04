import { ChangeEvent, FormEvent, useState } from "react";
import AllCurriculum from "./AllCurriculum/AllCurriculum";
import { useGetAllCourseQuery } from "../../../redux/api/features/Course/courseManagementApi";
import { TCourse } from "../../../utils/types/globalTypes";
import { toast } from "sonner";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import { useAddCurriculumMutation } from "../../../redux/api/features/Curriculum/curriculumManagementApi";

const AdminCourseCurriculum = () => {
  const { data } = useGetAllCourseQuery(undefined);
  const [addCurriculum] = useAddCurriculumMutation();
  const allCourses = data?.data;

  const [courseId, setCourseId] = useState("");
  const handleCourseId = (event: ChangeEvent<HTMLSelectElement>) => {
    const courseId = event?.target?.value;
    setCourseId(courseId);
  };

  const handleSubmitBatch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const title = Form.titlee.value;
    const order = Form.order.value;
    if (!courseId) {
      toast.error("Select Course", { id: sonarId });
      return;
    }
    const formData = { title, courseId, order };
    toast.loading("Curriculum Adding", { id: sonarId });
    const res = await addCurriculum(formData).unwrap();
    if (res?.success) {
      toast.success("Curriculum added successfully", { id: sonarId });
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Admin Batch</h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <div className="">
          <h1 className="font-bold text-xl">Add Course Curriculum</h1>
          <form action="" className="mt-4" onSubmit={handleSubmitBatch}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h1 className="block mb-4 text-sm font-medium">Title</h1>
                <input
                  type="text"
                  name="titlee"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Curriculum name"
                  required
                />
              </div>
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

              <div>
                <h1 className="block mb-4 text-sm font-medium">Order</h1>
                <input
                  type="text"
                  name="order"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Curriculum name"
                  required
                />
              </div>
            </div>
            <button className="btn btn-primary text-white mt-4">
              Add Curriculum
            </button>
          </form>
        </div>
        <div>
          <AllCurriculum />
        </div>
      </div>
    </div>
  );
};

export default AdminCourseCurriculum;
