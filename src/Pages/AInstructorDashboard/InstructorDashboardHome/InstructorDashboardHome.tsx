import { useState } from "react";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import { useGetBatchUnderInstructorQuery } from "../../../redux/api/features/Batch/batchManagementApi";
import { useAppSelector } from "../../../redux/hook";
import { verifyToken } from "../../../utils/Fucntion/verifyToken";
import { TAssignedStudent, TBatch } from "../../../utils/types/globalTypes";
import "./InstructorDashboardHome.css";
import { useGetInstructorsAssignStudentQuery } from "../../../redux/api/features/AssignStudent/assignStudentManagementApi";
import SendNotice from "./SendNotice/SendNotice";
import { useTitle } from "../../../Component/hook/useTitle";

const InstructorDashboardHome = () => {
  const { courses } = useAppSelector((state) => state.courses);
  const { batchs } = useAppSelector((state) => state.batchs);
  // console.log("Courses: ", courses);
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let instructor: any;
  if (token) {
    instructor = verifyToken(token);
  }
  useTitle(`${instructor?.name} Dashboard`);

  const { data: batchData, isLoading: batchLoading } =
    useGetBatchUnderInstructorQuery(instructor?.studentId);
  const batches = batchData?.data || [];

  console.log("Instructors assign batch:", batches);

  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const { data: assignedStudentData, isLoading: studentsLoading } =
    useGetInstructorsAssignStudentQuery({
      batchId: selectedBatch! as string, // Using `!` to assert it's not null
      courseId: selectedCourse! as string, // Same here
    });
  const assignStudents = assignedStudentData?.data;
  console.log(
    "Assign Student data--------------------------------",
    assignStudents
  );

  if (batchLoading || studentsLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Instructor Info Section */}
      <div className="bg-indigo-700 text-white p-6 rounded-xl shadow-lg mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Welcome, {instructor?.name}!
        </h1>
        <p className="text-indigo-100">Your Role: {instructor?.role}</p>
        <p className="text-indigo-100">Your ID: {instructor?.studentId}</p>
      </div>

      {/* Batches Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Your Assigned Batches
        </h2>

        {batches.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-700">No batches assigned to you yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch: TBatch, index: number) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {batch.batchName}
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Batch ID:</span>{" "}
                    {batch.batchId}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Course id:</span>{" "}
                    {batch.underCourse}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Course Name:</span>{" "}
                    {courses.find(
                      (course) => course.courseId === batch.underCourse
                    )?.courseTitle || "Not found"}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        batch.batchStatus === "upComing"
                          ? "bg-blue-100 text-blue-800"
                          : batch.batchStatus === "onGoing"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {batch.batchStatus}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Schedule:</span>{" "}
                    {batch.classdays}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Start Date:</span>{" "}
                    {new Date(batch.start).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Duration:</span>{" "}
                    {batch.duration}
                  </p>
                  {/* Show Student Button */}
                  <div className="flex items-center gap-x-4">
                    <button
                      onClick={() => {
                        setSelectedBatch(batch.batchId);
                        setSelectedCourse(batch.underCourse);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    >
                      Show Students
                    </button>
                    <SendNotice batchId={batch?.batchId} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Students Section */}
      {assignStudents && assignStudents.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Assigned Students
          </h2>

          <p>Total Student: {assignStudents.length} </p>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Batch </th>
                <th className="px-4 py-2">Batch Name </th>
                <th className="px-4 py-2">Course Code</th>
                <th className="px-4 py-2">Course Name</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {assignStudents.map((student: TAssignedStudent) => (
                <tr key={student.studentId}>
                  <td className="border px-4 py-2">{student.studentName}</td>
                  <td className="border px-4 py-2">{student.studentEmail}</td>
                  <td className="border px-4 py-2">{student.studentPhone}</td>
                  <td className="border px-4 py-2">{student.batchId}</td>
                  <td className="border px-4 py-2">
                    {batchs?.find((c) => c.batchId === student?.batchId)
                      ?.batchName || "Not Found"}
                  </td>
                  <td className="border px-4 py-2">{student.courseId}</td>
                  <td className="border px-4 py-2">
                    {courses?.find((c) => c.courseId === student?.courseId)
                      ?.courseTitle || "Not Found"}
                  </td>
                  <td className="border px-4 py-2">
                    {student.status ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboardHome;
