import { UserPlus } from "lucide-react";
import { Modal } from "antd";
import { ChangeEvent, FormEvent, useState } from "react";
import { TBatch, TCourse, TStudent } from "../../../../utils/types/globalTypes";
import { useGetAllCourseQuery } from "../../../../redux/api/features/Course/courseManagementApi";
import { useGetAllBatchQuery } from "../../../../redux/api/features/Batch/batchManagementApi";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import { useAddAssignStudentMutation } from "../../../../redux/api/features/AssignStudent/assignStudentManagementApi";

interface IProps {
  student: TStudent;
}
const AssignStudent = ({ student }: IProps) => {
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

  // console.log("Student: ", student);
  const { studentId, name, email, phone } = student;
  const [addAssignStudent] = useAddAssignStudentMutation();

  //Fetch Course
  const { data: courseFetch } = useGetAllCourseQuery(undefined);
  const allCourses = courseFetch?.data;

  const { data: batchFetch } = useGetAllBatchQuery(undefined);
  const allBatch = batchFetch?.data;
  // console.log("All Batch: ", allBatch);

  const [courseId, setCourseId] = useState("");
  const handleCourseId = (event: ChangeEvent<HTMLSelectElement>) => {
    const data = event?.target?.value;
    setCourseId(data);
  };
  const [batchId, setBatchId] = useState("");
  const handleBatchId = (event: ChangeEvent<HTMLSelectElement>) => {
    const data = event?.target?.value;
    setBatchId(data);
  };
  // console.log("Selected course Id: ", courseId);
  // console.log("Selected batch Id: ", batchId);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const transactionId = Form.transactionId.value;
    if (!courseId) {
      toast.error("Course is not selected", { id: sonarId });
      return;
    }
    if (!batchId) {
      toast.error("Batch is not selected", { id: sonarId });
      return;
    }

    const formData = {
      studentId,
      name,
      email,
      phone,
      courseId,
      batchId,
      transactionId,
    };
    toast.loading("Assigning Student", { id: sonarId });
    const res = await addAssignStudent(formData).unwrap();
    console.log("res: ", res);
    if (res?.success) {
      toast.success("Assigned Student Successfully", { id: sonarId });
      setIsModalOpen(false);
    }
  };
  return (
    <div className="">
      <div onClick={showModal}>
        <UserPlus />
      </div>
      <Modal
        title="Assign Student"
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
        <div className="form-container ">
          <h2 className="font-bold">Make Assign</h2>
          {/* Show the selected image */}

          <form onSubmit={handleSubmit} className="form">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-4">
                <label
                  htmlFor="studentId"
                  className="block text-sm font-medium text-black"
                >
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  defaultValue={studentId}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter Student ID"
                />
              </div>

              {/* Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={name}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter Name"
                  disabled
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={email}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter Email"
                  disabled
                />
              </div>

              {/* Phone Input */}
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-black"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={phone}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter Phone Number"
                  disabled
                />
              </div>
              {/* Course id Input */}
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-black"
                >
                  Course id
                </label>

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
              {/* Batch id Input */}
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-black"
                >
                  Batch id
                </label>
                <select
                  name=""
                  value={batchId}
                  onChange={handleBatchId}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  {allBatch?.map((data: TBatch, idx: number) => (
                    <option key={idx} value={data?.batchId}>
                      {data?.batchId}
                    </option>
                  ))}
                </select>
              </div>
              {/* transaction Input */}
              <div className="mb-6 md:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-black "
                >
                  Transaction id
                </label>
                <input
                  type="text"
                  name="transactionId"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter Trsnsaction id"
                  required
                />
              </div>
            </div>
            <button className="btn btn-primary text-white">
              Assign Student
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AssignStudent;
