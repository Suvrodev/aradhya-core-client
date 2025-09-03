/* eslint-disable @typescript-eslint/no-explicit-any */

interface IProps {
  student: any;
  batchId: string;
}
const LoggedUserForm = ({ student, batchId }: IProps) => {
  console.log("Student-------------------------------", student);
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center my-4 underline underline-offset-4">
        Student Detail
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Student ID */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-300 mb-1 w-32">
            Student ID
          </label>
          <input
            defaultValue={student?.studentId}
            type="text"
            className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
            disabled
          />
        </div>

        {/* Student Name */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-300 mb-1 w-32">
            Student Name
          </label>
          <input
            defaultValue={student?.name}
            type="text"
            className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
            disabled
          />
        </div>

        {/* Batch ID */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-300 mb-1 w-32">
            Batch ID
          </label>
          <input
            defaultValue={batchId}
            type="text"
            className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
            disabled
          />
        </div>

        {/* Student Email */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-300 mb-1 w-32">
            Student Email
          </label>
          <input
            defaultValue={student?.email}
            type="email"
            className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default LoggedUserForm;
