import { toast } from "sonner";
import { TAssignedStudent, TCourse } from "../../../utils/types/globalTypes";
import { useDeleteAssignStudentMutation } from "../../../redux/api/features/AssignStudent/assignStudentManagementApi";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import { Trash2 } from "lucide-react";
import { formatDate } from "../../../utils/Fucntion/convertDate";
import AdminAssignStudentUpdate from "./AdminAssignStudentUpdate/AdminAssignStudentUpdate";
import { useAppSelector } from "../../../redux/hook";

interface IProps {
  data: TAssignedStudent;
  idx: number;
}
const AdminAssignedStudentTable = ({ data, idx }: IProps) => {
  // console.log("Data: ", data);
  const {
    studentId,
    studentName,
    studentEmail,
    studentPhone,
    courseId,
    batchId,
    batchName,
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
  const { courses: allCourses } = useAppSelector((state) => state.courses);
  // const allCourses = allCoursesData?.data;

  const handleDelete = async (id: string) => {
    toast.loading("Deleting", { id: sonarId });
    const res = await deleteAssignStudent(id).unwrap();
    if (res?.success) {
      toast.success("Student deleted successfully", { id: sonarId });
    }
  };

  // if (isLoading) {
  //   return (
  //     <tr>
  //       <td colSpan={24} className="text-center py-4">
  //         Loading....
  //       </td>
  //     </tr>
  //   );
  // }

  return (
    <tr
      key={idx}
      className={`border-b hover:bg-purple-500 transition-all duration-300 ${
        !status ? "bg-red-500" : idx % 2 ? "bg-gray-700" : "bg-gray-500"
      }`}
    >
      <td className="py-3 px-4">{idx + 1}</td>
      <td className="py-3 px-4">{studentId}</td>
      <td className="py-3 px-4">{studentName}</td>
      <td className="py-3 px-4">{studentEmail}</td>
      <td className="py-3 px-4">{studentPhone}</td>
      <td className="py-3 px-4">{courseId}</td>
      <td className="py-3 px-4">{batchId}</td>
      <td className="py-3 px-4">{batchName}</td>
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
        <AdminAssignStudentUpdate data={data} />
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
