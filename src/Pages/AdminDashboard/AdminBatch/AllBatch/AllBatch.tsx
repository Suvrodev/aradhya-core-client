import { useGetAllBatchQuery } from "../../../../redux/api/features/Batch/batchManagementApi";
import { TBatch } from "../../../../utils/types/globalTypes";
import AllBatchBox from "./AllBatchBox";

const AllBatch = () => {
  const { data, isLoading } = useGetAllBatchQuery(undefined);

  const batchData = data?.data;
  //   console.log("Batch: ", batchData);

  if (isLoading) {
    return <p>Loading Batch...</p>;
  }
  return (
    <div className="h-[950px] overflow-auto ">
      <h1 className="text-xl font-bold">All Batch</h1>
      <div className="flex flex-col gap-4">
        {batchData?.map((data: TBatch, idx: number) => (
          <AllBatchBox key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default AllBatch;
