import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import AllBatch from "../AllBatch/AllBatch";
import { useAddBatchMutation } from "../../../../redux/api/features/Batch/batchManagementApi";
import { useGetAllCourseQuery } from "../../../../redux/api/features/Course/courseManagementApi";
import LoadingPage from "../../../../Component/LoadingPage/LoadingPage";
import { TCourse, TInstructor } from "../../../../utils/types/globalTypes";
import { useGetAllInstructorQuery } from "../../../../redux/api/features/Instructor/instructorManagementApi";
import { useTitle } from "../../../../Component/hook/useTitle";

const AdminBatch = () => {
  useTitle("Admin-Batch");
  const { data: CourseData, isLoading } = useGetAllCourseQuery(undefined);
  const [addBatch] = useAddBatchMutation();
  const [batchStatus, setBatchStatus] = useState("");
  const { data: instructorData, isLoading: instructorLoading } =
    useGetAllInstructorQuery(undefined);
  const allInstructors = instructorData?.data;
  console.log("All Instructors: ", allInstructors);
  const courses = CourseData?.data;
  // console.log("Courses: ", courses);

  const [underCourse, setUnderCourse] = useState("");
  const handleUnderCourse = (event: ChangeEvent<HTMLSelectElement>) => {
    const data = event.target.value;
    setUnderCourse(data);
  };

  const [insId, setInsId] = useState("");
  const [insName, setInsName] = useState("");
  const [insImage, setInsImage] = useState("");
  const [insFb, setInsFb] = useState("");
  const handleInstructor = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setInsId(selectedId);

    const selectedInstructor = allInstructors?.find(
      (ins: TInstructor) => ins.instructorId.toString() === selectedId
    );

    if (selectedInstructor) {
      setInsName(selectedInstructor.name);
      setInsImage(selectedInstructor.image);
      setInsFb(selectedInstructor.facebookUrl);
    }
  };
  console.log("ins id: ", insId);

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
    const coursePrice = Form.coursePrice.value;
    const courseDiscount = Form.courseDiscount.value;
    const start = Form.start.value;
    const end = Form.end.value;
    const duration = Form.duration.value;
    const classNumber = Number(Form.classNumber.value);
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

    const formData = {
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
    console.log("FormData: ", formData);
    toast.loading("Adding Batch", { id: sonarId });
    const res = await addBatch(formData).unwrap();
    if (res?.success) {
      toast.success("Batch Added Successfully", { id: sonarId });
    }
  };

  if (isLoading || instructorLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Admin Batch</h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-1 gap-x-4">
        <div className="">
          <h1 className="font-bold text-xl text-center">Add Batch</h1>
          <form action="" className="mt-4" onSubmit={handleSubmitBatch}>
            <div className="grid grid-cols-6 gap-4">
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
                  required
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
                  type="tel"
                  name="coursePrice"
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
                  type="tel"
                  name="courseDiscount"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Course Discount"
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
                <h1 className="block mb-4 text-sm font-medium">
                  Duration(string)
                </h1>
                <input
                  type="text"
                  name="duration"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="3 Month"
                  required
                />
              </div>

              <div>
                <h1 className="block mb-4 text-sm font-medium">Class Number</h1>
                <input
                  type="tel"
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
                  type="tel"
                  name="projectnumber"
                  id=""
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 "
                  placeholder="Project Number"
                />
              </div>
              <div>
                <h1 className="block mb-4 text-sm font-medium">Instructor</h1>
                <select
                  name=""
                  id=""
                  onChange={handleInstructor}
                  value={insId}
                  className="w-full px-4 py-2 bg-indigo-800 text-indigo-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="" disabled>
                    Select One
                  </option>
                  {allInstructors?.map((ins: TInstructor, idx: number) => (
                    <option value={ins?.instructorId} key={idx}>
                      {ins?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h1 className="block mb-4 text-sm font-medium">
                  Instructor ID
                </h1>
                <input
                  type="number"
                  name=""
                  id=""
                  defaultValue={insId}
                  className="ha w-full px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all "
                  placeholder=" Instructor ID"
                  disabled
                />
              </div>
              <div>
                <h1 className="block mb-4 text-sm font-medium">
                  Instructor Name
                </h1>
                <input
                  type="text"
                  name=""
                  id=""
                  defaultValue={insName}
                  className="w-full px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all "
                  placeholder=" Instructor Name"
                  disabled
                />
              </div>
              <div>
                <h1 className="block mb-4 text-sm font-medium">
                  Instructor Image url
                </h1>
                <input
                  type="text"
                  name=""
                  id=""
                  defaultValue={insImage}
                  className="w-full px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all "
                  placeholder=" Instructor Image url"
                  disabled
                />
              </div>
              <div>
                <h1 className="block mb-4 text-sm font-medium">
                  Instructor FB
                </h1>
                <input
                  type="text"
                  name=""
                  id=""
                  defaultValue={insFb}
                  className="w-full px-4 py-2 bg-indigo-500 text-white  rounded-lg border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all "
                  placeholder="Instructor FB"
                  disabled
                />
              </div>

              <div>
                <h1 className="block mb-4 text-sm font-medium">Class days</h1>
                <input
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
              <div className="md:col-span-6">
                <label className="block font-medium mb-2 text-green-500">
                  Batch Schedule
                </label>
                <textarea
                  name="schedule"
                  className="w-full h-[250px] p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Job Position, separated by #"
                  defaultValue="01/01/2025,Orented Class#01/01/2025,Orented Class"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="btn w-10/12 mx-auto btn-primary text-white mt-4">
                Add Batch
              </button>
            </div>
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
