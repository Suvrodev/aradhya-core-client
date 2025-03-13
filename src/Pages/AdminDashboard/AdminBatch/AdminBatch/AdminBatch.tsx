import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import AllBatch from "../AllBatch/AllBatch";
import { useAddBatchMutation } from "../../../../redux/api/features/Batch/batchManagementApi";
import { useGetAllCourseQuery } from "../../../../redux/api/features/Course/courseManagementApi";
import LoadingPage from "../../../../Component/LoadingPage/LoadingPage";
import { TCourse } from "../../../../utils/types/globalTypes";

const AdminBatch = () => {
  const { data: CourseData, isLoading } = useGetAllCourseQuery(undefined);
  const [addBatch] = useAddBatchMutation();
  const [batchStatus, setBatchStatus] = useState("");

  const courses = CourseData?.data;
  // console.log("Courses: ", courses);

  const [underCourse, setUnderCourse] = useState("");
  const handleUnderCourse = (event: ChangeEvent<HTMLSelectElement>) => {
    const data = event.target.value;
    setUnderCourse(data);
  };

  const handleBatchStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const batchStatus = event.target.value;
    console.log("Batch Status: ", batchStatus);
    setBatchStatus(batchStatus);
  };
  const handleSubmitBatch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const batchId = Form.batchId.value;
    const batchName = Form.batchName.value;
    const start = Form.start.value;
    const end = Form.end.value;

    if (!underCourse) {
      toast.error("Not Selected Course", { id: sonarId });
      return;
    }

    if (!batchStatus) {
      toast.error("Batch Status must be needed", { id: sonarId });
      return;
    }

    const formData = {
      batchId,
      batchName,
      underCourse,
      start,
      end,
      batchStatus,
    };
    console.log("FormData: ", formData);
    toast.loading("Adding Batch", { id: sonarId });
    const res = await addBatch(formData).unwrap();
    if (res?.success) {
      toast.success("Batch Added Successfully", { id: sonarId });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Admin Batch</h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <div className="">
          <h1 className="font-bold text-xl">Add Batch</h1>
          <form action="" className="mt-4" onSubmit={handleSubmitBatch}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h1 className="block mb-4 text-sm font-medium">Batch id</h1>
                <input
                  type="text"
                  name="batchId"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Batch id"
                  required
                />
              </div>
              <div>
                <h1 className="block mb-4 text-sm font-medium">Batch Name</h1>
                <input
                  type="text"
                  name="batchName"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Batch Name"
                />
              </div>
              <div className="">
                <h1 className="block mb-4 text-sm font-medium">Start Date</h1>
                <input
                  type="date"
                  name="start"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Batch id"
                  required
                />
              </div>
              <div>
                <h1 className="block mb-4 text-sm font-medium">End Date</h1>
                <input
                  type="date"
                  name="end"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Batch Name"
                />
              </div>
              <div>
                <h1 className="block mb-4 text-sm font-medium">Under Course</h1>
                <select
                  name=""
                  id=""
                  onChange={handleUnderCourse}
                  value={underCourse}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                >
                  <option value="" disabled>
                    Select One
                  </option>
                  {courses?.map((course: TCourse, idx: number) => (
                    <option value={course?.courseId} key={idx}>
                      {course?.courseTitle}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h1 className="block mb-4 text-sm font-medium">Batch Status</h1>
                <select
                  name=""
                  id=""
                  onChange={handleBatchStatus}
                  value={batchStatus}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                >
                  <option value="" disabled>
                    Select One
                  </option>
                  <option value="onGoing">On Going</option>
                  <option value="upComing">Up Comming</option>
                  <option value="end">End</option>
                </select>
              </div>
            </div>
            <button className="btn btn-primary text-white mt-4">
              Add Batch
            </button>
          </form>
        </div>
        <div>
          <AllBatch />
        </div>
      </div>
    </div>
  );
};

export default AdminBatch;
