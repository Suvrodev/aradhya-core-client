import { TStudent } from "../../utils/types/globalTypes";

interface IProps {
  loggedStudent: TStudent;
}
const StudentDashboardHome = ({ loggedStudent }: IProps) => {
  return (
    <div>
      <h1>Hi, Student</h1>
    </div>
  );
};

export default StudentDashboardHome;
