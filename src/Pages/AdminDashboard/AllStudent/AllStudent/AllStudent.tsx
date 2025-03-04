import { Trash2 } from "lucide-react";
import LoadingPage from "../../../../Component/LoadingPage/LoadingPage";
import { useGetAllStudentQuery } from "../../../../redux/api/features/Student/studentManagementApi";
import { TStudent } from "../../../../utils/types/globalTypes";
import { UserPlus } from "lucide-react";
import { useState } from "react";

const AllStudent = () => {
  //   const [allStudents, isLoading] = useGetAllStudentQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllStudentQuery(
    searchTerm ? { search: searchTerm } : undefined
  );
  const allStudents = data?.data;
  //   console.log("All Students: ", allStudents);
  console.log("Search Team: ", searchTerm);
  const handleAssign = (data: TStudent) => {
    console.log("Handle Assign Student: ", data);
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="pagePadding">
      <h1 className="text-xl font-bold">All Student</h1>

      {/* Simple Search Input */}
      <div className="my-4 flex justify-center">
        <input
          type="text"
          className="w-11/12 md:w-1/2  px-4 py-2 border border-[#1F2937] bg-[#1F2937] rounded-lg  text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Search by id, Name, Email, or Phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className=" overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-0 md:p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-teal-500">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Student Id</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Make Assign</th>
              <th className="py-3 px-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allStudents?.map((data: TStudent, idx: number) => (
              <tr
                key={idx}
                className=" border-b border-gray-700 hover:bg-gray-700 transition-all duration-300"
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={data?.image}
                    className="w-16 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-4">{data?.studentId}</td>
                <td className="py-3 px-4">{data?.name}</td>
                <td className="py-3 px-4">{data?.email}</td>
                <td className="py-3 px-4">{data?.phone}</td>
                <td className="py-3 px-4">{data?.role}</td>
                <td className="py-3 px-4">
                  <button
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
                    onClick={() => handleAssign(data)}
                  >
                    <UserPlus />
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button className="btn btn-error text-white flex items-center justify-center">
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

export default AllStudent;
