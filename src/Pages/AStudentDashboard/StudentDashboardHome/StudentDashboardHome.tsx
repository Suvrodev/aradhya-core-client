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
      <div className="flex flex-col gap-[20px]">
        {ownCourse?.map((data: TAssignedStudent, idx: number) => (
          <EnrolledCard key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default StudentDashboardHome;
