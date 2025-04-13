import { useTitle } from "../../../Component/hook/useTitle";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import { useGetAllServiceQuery } from "../../../redux/api/features/Service/serviceManagementApi";
import { TService } from "../../../utils/types/globalTypes";
import AllCourseServiceSection from "./AllCourseServiceSection/AllCourseServiceSection";

const UserAllCourses = () => {
  useTitle("All Courses");
  const { data: serviceData, isLoading } = useGetAllServiceQuery(undefined);
  const services = serviceData?.data;

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="mainContainer">
      <div className="container ">
        <div className="flex flex-col gap-10 mt-2">
          {services?.map((data: TService, idx: number) => (
            <AllCourseServiceSection key={idx} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAllCourses;
