import { useGetOwnCourseOfAssignStudentQuery } from "../../../redux/api/features/AssignStudent/assignStudentManagementApi";
import { useAppSelector } from "../../../redux/hook";
import { verifyToken } from "../../../utils/Fucntion/verifyToken";
import { TAssignedStudent } from "../../../utils/types/globalTypes";
import EnrolledCard from "./EnrolledCard/EnrolledCard";
import "./StudentDashboardHome.css";

const StudentDashboardHome = () => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }
  console.log("User in Home: ", user);

  const { data, isLoading } = useGetOwnCourseOfAssignStudentQuery(
    user?.studentId
  );

  const ownCourse = data?.data;

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="sPadding min-h-screen ">
      {ownCourse?.length > 0 ? (
        <div className="flex flex-col gap-[20px]">
          {ownCourse?.map((data: TAssignedStudent, idx: number) => (
            <EnrolledCard key={idx} data={data} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl shadow-lg text-center max-w-2xl mx-4">
            <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">
              আপনি কোনো কোর্সে এখনো এনরোল করেন নি
            </h2>
            <p className="text-gray-700 text-sm md:text-base mb-6">
              আপনি যদি কোনো কোর্সে ইতিমধ্যে কিনে থাকেন কিন্তু আপনার Dashboard এ
              ২৪ ঘন্টার মধ্যে না দেখতে পারেন, তাহলে নিচের নাম্বারে কন্টাক্ট
              করুন:
            </p>
            <div className="bg-purple-100 p-4 rounded-lg inline-block">
              <p className="text-purple-800 font-semibold text-lg md:text-xl">
                01951912997
              </p>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mt-4">
              আমরা আপনার সমস্যা দ্রুত সমাধান করার চেষ্টা করব।
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboardHome;
