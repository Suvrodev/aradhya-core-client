import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import { useGetAllAssignStudentQuery } from "../../../redux/api/features/AssignStudent/assignStudentManagementApi";
import { TAssignedStudent } from "../../../utils/types/globalTypes";
import AdminAssignedStudentTable from "./AdminAssignedStudentTable";
import { useState } from "react";

const AdminAssignedStudent = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // For search
  const [status, setStatus] = useState<string>(""); // For filter by status
  const [sort, setSort] = useState<string>("desc"); // For sorting createdAt

  const { data, isLoading } = useGetAllAssignStudentQuery({
    search: searchTerm,
    status: status,
    sort: sort, // Adding query params to API request
  });

  const allAssignedStudent = data?.data;

  console.log("All Assigned Student: ", allAssignedStudent);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="pagePadding">
      <h1 className="text-xl font-bold text-center">Assigned Student</h1>

      {/* Search Input */}
      <div className="my-4 flex justify-center">
        <input
          type="text"
          className="w-11/12 md:w-1/2 px-4 py-2 border border-[#1F2937] bg-[#1F2937] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Search by id, Name, Email, or Phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        {/* Filter by Status */}
        <div className="my-4 flex justify-center">
          <select
            className="w-full px-4 py-2 border border-[#1F2937] bg-[#1F2937] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Sort by CreatedAt */}
        <div className="my-4 flex justify-center">
          <select
            className="w-full px-4 py-2 border border-[#1F2937] bg-[#1F2937] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-0 md:p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-teal-500">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">id</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Course id</th>
              <th className="py-3 px-4 text-left">Batch id</th>
              <th className="py-3 px-4 text-left">Course Name</th>
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
              <th className="py-3 px-4 text-left">Assign</th>
              <th className="py-3 px-4 text-left">Create</th>
              <th className="py-3 px-4 text-left">Update</th>
              <th className="py-3 px-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allAssignedStudent?.map((data: TAssignedStudent, idx: number) => (
              <AdminAssignedStudentTable data={data} idx={idx} key={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAssignedStudent;
