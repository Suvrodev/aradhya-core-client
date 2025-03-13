import { Modal } from "antd";
import { Settings } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useGetAllCourseQuery } from "../../../../redux/api/features/Course/courseManagementApi";
import { TBatch, TCourse } from "../../../../utils/types/globalTypes";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import { useUpdateBatchMutation } from "../../../../redux/api/features/Batch/batchManagementApi";

interface IProps {
  data: TBatch;
}

const UpdateBatch = ({ data }: IProps) => {
  //   Modal Default Class start
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //   Modal Default Class end

  /**
   * Start Logic From Here
   */

  //   console.log("Flim Data: ", data);
  const [updateBatch] = useUpdateBatchMutation();
  const { data: CourseData } = useGetAllCourseQuery(undefined);
  const courses = CourseData?.data;
  //   console.log("Courses: ", courses);
  const [batchStatus, setBatchStatus] = useState(data?.batchStatus);
  const [underCourse, setUnderCourse] = useState(data?.underCourse);
  const handleUnderCourse = (event: ChangeEvent<HTMLSelectElement>) => {
    const data = event.target.value;
    setUnderCourse(data);
  };

  const handleBatchStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const batchStatus = event.target.value;
    console.log("Batch Status: ", batchStatus);
    setBatchStatus(batchStatus);
  };

  const handleUpdateBatch = async (event: FormEvent<HTMLFormElement>) => {
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

    const updateData = {
      batchId,
      batchName,
      underCourse,
      start,
      end,
      batchStatus,
    };
    console.log("Update Data: ", updateData);
    toast.loading("Updating Batch", { id: sonarId });
    const res = await updateBatch({ id: batchId, updateData }).unwrap();
    if (res?.status) {
      toast.success("Batch Updated Successfully", { id: sonarId });
    }
  };

  return (
    <div className="">
      <div onClick={showModal}>
        <button className="w-[30px] h-[30px] bg-green-500 text-white flex justify-center items-center rounded-md p-2">
          <Settings />
        </button>
      </div>
      <Modal
        title="Update Batch"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <div className="">
          <h1 className="font-bold text-xl">Update Batch</h1>
          <form action="" className="mt-4" onSubmit={handleUpdateBatch}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h1 className="block mb-4 text-sm font-medium">Batch id</h1>
                <input
                  defaultValue={data?.batchId}
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
                  defaultValue={data?.batchName}
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
                  defaultValue={data?.start}
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
                  defaultValue={data?.end}
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
              Update Batch
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateBatch;
