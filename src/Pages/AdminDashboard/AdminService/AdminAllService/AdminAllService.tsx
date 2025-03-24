import { toast } from "sonner";
import {
  useDeleteServiceMutation,
  useGetAllServiceByAdminQuery,
} from "../../../../redux/api/features/Service/serviceManagementApi";
import { TService } from "../../../../utils/types/globalTypes";
import { Trash2 } from "lucide-react";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import AdminUpdateService from "../AdminUpdateService/AdminUpdateService";

const AdminAllService = () => {
  const { data, isLoading } = useGetAllServiceByAdminQuery(undefined);
  const [deleteService] = useDeleteServiceMutation();
  const serviceData = data?.data;
  //   console.log("Service data: ", serviceData);

  const handleDelete = async (id: string) => {
    // console.log("Handle Delete", id);
    toast.loading("Deleting", { id: sonarId });
    const res = await deleteService(id).unwrap();
    if (res?.success) {
      toast.success("Service deleted Successfully", { id: sonarId });
    }
  };

  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <div className="grid grid-cols-1  gap-4  ">
        {serviceData?.map((data: TService, idx: number) => (
          <div key={idx} className="border border-1 p-4 rounded-md relative">
            <p className="font-bold">
              Order: <span> {data?.order}</span>{" "}
            </p>
            <p className="">
              {" "}
              <span>Service id: </span>{" "}
              <span className="font-bold"> {data?.serviceId}</span>
            </p>
            <p className="text-xl font-bold">{data?.name}</p>

            <p className="mt-2">
              Exist:
              <span
                className={`relative left-2 rounded-md px-2 py-1 ${
                  data?.serviceExists == "yes" ? "bg-green-500" : "bg-red-600"
                }`}
              >
                {data?.serviceExists}
              </span>{" "}
            </p>

            <div className="absolute top-2 right-0 flex  gap-x-2">
              <AdminUpdateService data={data} />
              <p
                className="w-[30px] h-[30px] bg-red-500 text-white flex justify-center items-center rounded-md p-2"
                onClick={() => handleDelete(data?.serviceId)}
              >
                <Trash2 />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllService;
