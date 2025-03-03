import {
  useDeleteBatchMutation,
  useGetAllBatchQuery,
} from "../../../../redux/api/features/Batch/batchManagementApi";
import { TBatch } from "../../../../utils/types/globalTypes";
import DeleteComponent from "../../../../Component/DeleteComponent/DeleteComponent";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";

const AllBatch = () => {
  const { data, isLoading } = useGetAllBatchQuery(undefined);
  const [deleteBatch] = useDeleteBatchMutation();
  const batchData = data?.data;
  //   console.log("Batch: ", batchData);

  const handleDelete = async (id: string) => {
    console.log("Delete: ", id);
    toast.loading("Deleting batch", { id: sonarId });
    const res = await deleteBatch(id).unwrap();
    console.log("res: ", res);
    if (res?.status) {
      toast.success("Batch deleted", { id: sonarId });
    }
  };

  if (isLoading) {
    return <p>Loading Batch...</p>;
  }
  return (
    <div className="h-[950px] overflow-auto ">
      <h1 className="text-xl font-bold">All Batch</h1>
      <div className="flex flex-col gap-4">
        {batchData?.map((data: TBatch, idx: number) => (
          <div key={idx} className="border py-4 px-2 rounded-md relative ">
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
            <div className="mt-4 flex justify-between">
              <p>
                <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
                  Batch Status
                </span>{" "}
                <span className="ml-2"> {data?.batchStatus}</span>
              </p>
            </div>

            <div className="absolute top-2 right-2">
              <div onClick={() => handleDelete(data?.batchId)}>
                <DeleteComponent />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBatch;
