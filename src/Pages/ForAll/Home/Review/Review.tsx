import ReviewBox from "./ReviewBox";
import { useGetAllOurPeopleWithMessageQuery } from "../../../../redux/api/features/OurPeople/ourPeopleManagementApi";
import { TOurPeople } from "../../../../utils/types/globalTypes";

const Review = () => {
  const { data, isLoading } = useGetAllOurPeopleWithMessageQuery(undefined);
  const peoples = data?.data;
  if (isLoading) {
    return <span className="loading loading-spinner text-success"></span>;
  }
  return (
    <div className="mb-4">
      <h1 className="text-4xl text-center">
        দেখে নিন কি বলছেন আরাধ্য কোর এর ইন্সট্রেকটর রা
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        {peoples.map((people: TOurPeople, idx: number) => (
          <ReviewBox key={idx} people={people} />
        ))}
      </div>
    </div>
  );
};

export default Review;
