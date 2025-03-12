import { toast } from "sonner";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import {
  useDeleteAssignStudentMutation,
  useGetAllAssignStudentQuery,
} from "../../../redux/api/features/AssignStudent/assignStudentManagementApi";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import { TAssignedStudent } from "../../../utils/types/globalTypes";
import { Trash2 } from "lucide-react";

const AdminAssignedStudent = () => {
  const [deleteAssignStudent] = useDeleteAssignStudentMutation();
  const { data, isLoading } = useGetAllAssignStudentQuery(undefined);
  const allAssignedStudent = data?.data;
  console.log("All Assigned Student: ", allAssignedStudent);

  const handleDelete = async (id: string) => {
    toast.loading("Deleting", { id: sonarId });
    const res = await deleteAssignStudent(id).unwrap();
    if (res?.success) {
      toast.success("Student deleted successfully", { id: sonarId });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="pagePadding">
      <h1 className="text-xl font-bold">Assigned Student</h1>

      <div className=" overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-0 md:p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-teal-500">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">id</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Course id</th>
              <th className="py-3 px-4 text-left">Course Price</th>
              <th className="py-3 px-4 text-left">Course Discount</th>
              <th className="py-3 px-4 text-left">PromoCodeStatus</th>
              <th className="py-3 px-4 text-left">PromoCode</th>
              <th className="py-3 px-4 text-left">Applied promoCode</th>
              <th className="py-3 px-4 text-left">promo Percent</th>
              <th className="py-3 px-4 text-left">Final Price</th>
              <th className="py-3 px-4 text-left">GateWay</th>
              <th className="py-3 px-4 text-left">transactionId</th>
              <th className="py-3 px-4 text-left">Transaction Number</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Update</th>
              <th className="py-3 px-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allAssignedStudent?.map((data: TAssignedStudent, idx: number) => (
              <tr
                key={idx}
                className=" border-b border-gray-700 hover:bg-gray-700 transition-all duration-300"
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{data?.studentId}</td>
                <td className="py-3 px-4">{data?.studentName}</td>
                <td className="py-3 px-4">{data?.studentEmail}</td>
                <td className="py-3 px-4">{data?.studentPhone}</td>
                <td className="py-3 px-4">{data?.courseId}</td>
                <td className="py-3 px-4">{data?.coursePrice}</td>
                <td className="py-3 px-4">{data?.courseDiscount}</td>
                <td className="py-3 px-4">{data?.promoCodeStatus}</td>
                <td className="py-3 px-4">{data?.promoCode}</td>
                <td className="py-3 px-4">{data?.appliedpromoCode}</td>
                <td className="py-3 px-4">{data?.promoPercent}</td>
                <td className="py-3 px-4">{data?.finalPrice}</td>
                <td className="py-3 px-4">{data?.paymentGateWay}</td>
                <td className="py-3 px-4">{data?.transactionId}</td>
                <td className="py-3 px-4">{data?.transactionMobileNumber}</td>
                <td className="py-3 px-4">{data?.status?.toString()}</td>
                <td className="py-3 px-4">
                  <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300">
                    {/* <AssignStudent student={data} /> */}
                    Assign
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="btn btn-error text-white flex items-center justify-center"
                    onClick={() => handleDelete(data?.studentId)}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAssignedStudent;

// import { Trash2 } from "lucide-react";
// import LoadingPage from "../../../../Component/LoadingPage/LoadingPage";
// import {
//   useDeleteStudentMutation,
//   useGetAllStudentQuery,
// } from "../../../../redux/api/features/Student/studentManagementApi";
// import { TStudent } from "../../../../utils/types/globalTypes";
// import { useState } from "react";
// import { toast } from "sonner";
// import { sonarId } from "../../../../utils/Fucntion/sonarId";
// import AssignStudent from "../AssignStudent/AssignStudent";

// const AllStudent = () => {
//   const [deleteStudent] = useDeleteStudentMutation();
//   const [searchTerm, setSearchTerm] = useState("");
//   const { data, isLoading } = useGetAllStudentQuery(
//     searchTerm ? { search: searchTerm } : undefined
//   );
//   const allStudents = data?.data;
//   //   console.log("All Students: ", allStudents);
//   console.log("Search Team: ", searchTerm);

//   if (isLoading) {
//     return <LoadingPage />;
//   }
//   return (
//     <div className="pagePadding">
//       <h1 className="text-xl font-bold">All Student</h1>

//       {/* Simple Search Input */}
//       <div className="my-4 flex justify-center">
//         <input
//           type="text"
//           className="w-11/12 md:w-1/2  px-4 py-2 border border-[#1F2937] bg-[#1F2937] rounded-lg  text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//           placeholder="Search by id, Name, Email, or Phone..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className=" overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-0 md:p-6">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="bg-teal-500">
//               <th className="py-3 px-4 text-left">#</th>
//               <th className="py-3 px-4 text-left">Image</th>
//               <th className="py-3 px-4 text-left">Student Id</th>
//               <th className="py-3 px-4 text-left">Name</th>
//               <th className="py-3 px-4 text-left">Email</th>
//               <th className="py-3 px-4 text-left">Phone</th>
//               <th className="py-3 px-4 text-left">Role</th>
//               <th className="py-3 px-4 text-left">Make Assign</th>
//               <th className="py-3 px-4 text-left">Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allStudents?.map((data: TStudent, idx: number) => (
//               <tr
//                 key={idx}
//                 className=" border-b border-gray-700 hover:bg-gray-700 transition-all duration-300"
//               >
//                 <td className="py-3 px-4">{idx + 1}</td>
//                 <td className="py-3 px-4">
//                   <img
//                     src={data?.image}
//                     className="w-16 h-10 object-cover rounded-md"
//                   />
//                 </td>
//                 <td className="py-3 px-4">{data?.studentId}</td>
//                 <td className="py-3 px-4">{data?.name}</td>
//                 <td className="py-3 px-4">{data?.email}</td>
//                 <td className="py-3 px-4">{data?.phone}</td>
//                 <td className="py-3 px-4">{data?.role}</td>
//                 <td className="py-3 px-4">
//                   <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300">
//                     <AssignStudent student={data} />
//                   </button>
//                 </td>
//                 <td className="py-3 px-4">
//                   <button
//                     className="btn btn-error text-white flex items-center justify-center"
//                     onClick={() => handleDelete(data?.studentId)}
//                   >
//                     <Trash2 />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllStudent;
