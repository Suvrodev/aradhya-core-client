import { Modal } from "antd";
import { Settings } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  TBatch,
  TCourse,
  TInstructor,
} from "../../../../utils/types/globalTypes";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import {
  useGetJustOneBatchForUpdateQuery,
  useUpdateBatchMutation,
} from "../../../../redux/api/features/Batch/batchManagementApi";
import { useAppSelector } from "../../../../redux/hook";

interface IProps {
  batchId: string;
}

const UpdateBatch = ({ batchId }: IProps) => {
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
  const { courses } = useAppSelector((state) => state.courses);
  const { instructors } = useAppSelector((state) => state.instructors);

  console.log("Pass batch id for update: ", batchId);
  const [updateBatch] = useUpdateBatchMutation();

  //Fetching batch
  const { data: batchData, isLoading: batchLoading } =
    useGetJustOneBatchForUpdateQuery(batchId);
  const batch: TBatch = batchData?.data;
  console.log("Come batch data in Update:", batch);

  console.log("Courses: ", courses);
  const [batchStatus, setBatchStatus] = useState(batch?.batchStatus);
  const [underCourse, setUnderCourse] = useState(batch?.underCourse);
  console.log("----------------------------------undercourse: ", underCourse);

  const handleBatchStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const batchStatus = event.target.value;
    console.log("Batch Status: ", batchStatus);
    setBatchStatus(batchStatus);
  };

  const handleUnderCourse = (event: ChangeEvent<HTMLSelectElement>) => {
    const data = event.target.value;
    setUnderCourse(data);
  };

  ///Handle Instructor

  console.log("All Instructors: ", instructors);

  const [insId, setInsId] = useState(batch?.instructorId);
  const [insName, setInsName] = useState(batch?.instructorname);
  const [insImage, setInsImage] = useState(batch?.instructorimage);
  const [insFb, setInsFb] = useState(batch?.instructorfb);
  const handleInstructor = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setInsId(selectedId);

    const selectedInstructor = instructors?.find(
      (ins: TInstructor) => ins.instructorId.toString() === selectedId
    );
    console.log("Select instructor: ", selectedInstructor);

    if (selectedInstructor) {
      setInsName(selectedInstructor.name);
      setInsImage(selectedInstructor.image);
      setInsFb(selectedInstructor.facebookUrl);
    }
  };
  console.log("ins id: ", insId);
  console.log("ins name: ", insName);
  console.log("ins image: ", insImage);
  console.log("ins fb: ", insFb);

  useEffect(() => {
    if (batch) {
      setUnderCourse(batch?.underCourse);
      setBatchStatus(batch?.batchStatus);
      setInsId(batch?.instructorId);
      setInsName(batch?.instructorname);
      setInsImage(batch?.instructorimage);
      setInsFb(batch?.instructorfb);
    }
  }, [batch]);

  const handleUpdateBatch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const batchId = Form.batchId.value;
    const batchName = Form.batchName.value;
    const coursePrice = Number(Form.coursePrice.value);
    const courseDiscount = Number(Form.courseDiscount.value);
    const start = Form.start.value;
    const end = Form.end.value;
    const duration = Form.duration.value;
    const classNumber = Form.classNumber.value;
    const projectnumber = Number(Form.projectnumber.value);
    // const instructorname = Form.instructorname.value;
    // const instructorimage = Form.instructorimage.value;
    // const instructorfb = Form.instructorfb.value;
    const classdays = Form.classdays.value;
    const supportdays = Form.supportdays.value;
    if (!underCourse) {
      toast.error("Not Selected Course", { id: sonarId });
      return;
    }

    if (!batchStatus) {
      toast.error("Batch Status must be needed", { id: sonarId });
      return;
    }
    if (!insId) {
      toast.error("Instructor must be needed", { id: sonarId });
      return;
    }

    // Processing Achedule into an array of objects
    const schedule = Form.schedule?.value;
    const scheduleArray = schedule.split("#").map((item: string) => {
      const [date, topic] = item.split(",").map((el) => el.trim());
      return { date, topic };
    });

    const updateData = {
      batchId,
      batchName,
      underCourse,
      coursePrice,
      courseDiscount,
      start,
      end,
      duration,
      classNumber,
      projectnumber,
      instructorId: insId,
      instructorname: insName,
      instructorimage: insImage,
      instructorfb: insFb,
      classdays,
      supportdays,
      batchStatus,
      schedule: scheduleArray,
    };
    console.log("Update Data: ", updateData);

    // Show the update data in a readable format
    const readableUpdateData = JSON.stringify(updateData, null, 2);
    const confirmUpdate = window.confirm(
      `You are about to update the batch with the following data:\n\n${readableUpdateData}\n\nAre you sure you want to continue?`
    );

    if (!confirmUpdate) {
      toast.info("Batch update cancelled.", { id: sonarId });
      return;
    }

    toast.loading("Updating Batch", { id: sonarId });
    const res = await updateBatch({ id: batchId, updateData }).unwrap();
    if (res?.status) {
      toast.success("Batch Updated SuccessfullWy", { id: sonarId });
    }
  };

  if (batchLoading) {
    return <p>Loading</p>;
  }

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
                  defaultValue={batch?.batchId}
                  type="text"
                  name="batchId"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 disabled:text-gray-400"
                  placeholder="Batch id"
                  disabled
                  required
                />
              </div>
              <div>
                <h1 className="block mb-4 text-sm font-medium">Batch Name</h1>
                <input
                  defaultValue={batch?.batchName}
                  type="text"
                  name="batchName"
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
                <h1 className="block mb-4 text-sm font-medium">Course Price</h1>
                <input
                  type="number"
                  name="coursePrice"
                  defaultValue={batch?.coursePrice}
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Course Price"
                />
              </div>
              <div>
                <h1 className="block mb-4 text-sm font-medium">
                  Course Discount
                </h1>
                <input
                  type="number"
                  name="courseDiscount"
                  defaultValue={batch?.courseDiscount}
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Course Discount"
                />
              </div>
              <div className="">
                <h1 className="block mb-4 text-sm font-medium">Start Date</h1>
                <input
                  defaultValue={batch?.start}
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
                  defaultValue={batch?.end}
                  type="date"
                  name="end"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Batch Name"
                />
              </div>

              <div>
                <h1 className="block mb-4 text-sm font-medium">Duration</h1>
                <input
                  defaultValue={batch?.duration}
                  type="text"
                  name="duration"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Duration"
                  required
                />
              </div>

              <div>
                <h1 className="block mb-4 text-sm font-medium">Class Number</h1>
                <input
                  defaultValue={batch?.classNumber}
                  type="number"
                  name="classNumber"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Class Number"
                />
              </div>

              <div>
                <h1 className="block mb-4 text-sm font-medium">
                  Project Number
                </h1>
                <input
                  defaultValue={batch?.projectnumber}
                  type="number"
                  name="projectnumber"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Project Number"
                  required
                />
              </div>
              <div>
                <h1 className="block mb-4 text-sm font-medium">Instructor</h1>
                <select
                  name=""
                  id=""
                  onChange={handleInstructor}
                  value={insId}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                >
                  <option value="" disabled>
                    Select One
                  </option>
                  {instructors?.map((ins: TInstructor, idx: number) => (
                    <option value={ins?.instructorId} key={idx}>
                      {ins?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h1 className="block mb-4 text-sm font-medium">Class days</h1>
                <input
                  defaultValue={batch?.classdays}
                  type="text"
                  name="classdays"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Class Days"
                  required
                />
              </div>

              <div>
                <h1 className="block mb-4 text-sm font-medium">Support Days</h1>
                <input
                  defaultValue={batch?.supportdays}
                  type="text"
                  name="supportdays"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Support Days"
                  required
                />
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

              {/*Batch Schedule */}
              <div className="md:col-span-2">
                <label className="block font-medium mb-2 text-green-500">
                  Batch Schedule
                </label>
                <textarea
                  name="schedule"
                  className="w-full h-[250px] p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Job Position, separated by #"
                  defaultValue={batch?.schedule
                    ?.map((item) => `${item.date},${item.topic}`)
                    .join("#")}
                />
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
