import { useGetAllBatchQuery } from "../../../../redux/api/features/Batch/batchManagementApi";
import { TBatch } from "../../../../utils/types/globalTypes";

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
          <div key={idx} className="border py-4 px-2 rounded-md ">
            <h1>
              {" "}
              <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
                Batch id
              </span>{" "}
              <span className="ml-4">{data?.batchId}</span>
            </h1>
            <div className="mt-4">
              {data?.batchName && (
                <p>
                  {" "}
                  <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
                    Batch Name
                  </span>{" "}
                  <span className="ml-2">{data?.batchName}</span>
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <p>
                {" "}
                <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
                  start
                </span>{" "}
                <span className="ml-2"> {data?.start}</span>
              </p>
              <p>
                <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
                  End
                </span>{" "}
                <span className="ml-2"> {data?.end}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBatch;
