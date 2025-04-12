import LoadingPage from "../../../../Component/LoadingPage/LoadingPage";
import { useGetAllOurPeopleQuery } from "../../../../redux/api/features/OurPeople/ourPeopleManagementApi";
import { TOurPeople } from "../../../../utils/types/globalTypes";
import PeopleBox from "../PeopleBox/PeopleBox";

const OurAllPeople = () => {
  const { data, isLoading } = useGetAllOurPeopleQuery(undefined);
  const ourPeoples = data?.data;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="py-12 px-4   ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          Meet Our Team
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The talented individuals who make our organization great
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {ourPeoples?.map((people: TOurPeople, idx: number) => (
          <PeopleBox key={idx} people={people} admin={true} />
        ))}
      </div>
    </div>
  );
};

export default OurAllPeople;
