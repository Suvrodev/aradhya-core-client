import { toast } from "sonner";
import { TAssignedStudent, TCourse } from "../../../utils/types/globalTypes";
import { useDeleteAssignStudentMutation } from "../../../redux/api/features/AssignStudent/assignStudentManagementApi";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import { useGetAllCourseQuery } from "../../../redux/api/features/Course/courseManagementApi";
import { Trash2 } from "lucide-react";
import { formatDate } from "../../../utils/Fucntion/convertDate";

interface IProps {
  data: TAssignedStudent;
  idx: number;
}
const AdminAssignedStudentTable = ({ data, idx }: IProps) => {
  console.log("Data: ", data);
  const {
    _id,
    studentId,
    studentName,
    studentEmail,
    studentPhone,
    courseId,
    batchId,
    coursePrice,
    courseDiscount,
    promoCodeStatus,
    promoCode,
    appliedpromoCode,
    promoPercent,
    finalPrice,
    paymentGateWay,
    status,
    transactionId,
    transactionMobileNumber,
    createdAt,
    updatedAt,
  } = data;
  const [deleteAssignStudent] = useDeleteAssignStudentMutation();
  const { data: allCoursesData, isLoading } = useGetAllCourseQuery(undefined);
  const allCourses = allCoursesData?.data;

  const handleDelete = async (id: string) => {
    toast.loading("Deleting", { id: sonarId });
    const res = await deleteAssignStudent(id).unwrap();
    if (res?.success) {
      toast.success("Student deleted successfully", { id: sonarId });
    }
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <tr
      key={idx}
      className={`border-b  hover:bg-green-500 transition-all duration-300 ${
        idx % 2 ? "bg-gray-700" : "bg-gray-500"
      }`}
    >
      <td className="py-3 px-4">{idx + 1}</td>
      <td className="py-3 px-4">{studentId}</td>
      <td className="py-3 px-4">{studentName}</td>
      <td className="py-3 px-4">{studentEmail}</td>
      <td className="py-3 px-4">{studentPhone}</td>
      <td className="py-3 px-4">{courseId}</td>
      <td className="py-3 px-4">{batchId}</td>
      <td className="py-3 px-4">
        {allCourses?.find((course: TCourse) => course.courseId === courseId)
          ?.courseTitle || "N/A"}
      </td>
      <td className="py-3 px-4">{coursePrice}</td>
      <td className="py-3 px-4">{courseDiscount}%</td>
      <td className="py-3 px-4">{promoCodeStatus}</td>
      <td className="py-3 px-4">{promoCode}</td>
      <td className="py-3 px-4">{appliedpromoCode}</td>
      <td className="py-3 px-4">{promoPercent}%</td>
      <td className="py-3 px-4">{finalPrice}</td>
      <td className="py-3 px-4">{paymentGateWay}</td>
      <td className="py-3 px-4">{transactionId}</td>
      <td className="py-3 px-4">{transactionMobileNumber}</td>
      <td className={`py-3 px-4 ${status ? "bg-green-500" : "bg-yellow-600"}`}>
        {status.toString()}
      </td>
      <td className="py-3 px-4">
        <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300">
          Assign
        </button>
      </td>
      <td className="py-3 px-4">{formatDate(createdAt)}</td>
      <td className="py-3 px-4">{formatDate(updatedAt)}</td>
      <td className="py-3 px-4">
        <button
          className="btn btn-error text-white flex items-center justify-center"
          onClick={() => handleDelete(studentId)}
        >
          <Trash2 />
        </button>
      </td>
    </tr>
  );
};

export default AdminAssignedStudentTable;
