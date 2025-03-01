import { toast } from "sonner";
import {
  useDeleteServiceMutation,
  useGetAllServiceQuery,
} from "../../../../redux/api/features/Service/serviceManagementApi";
import { TService } from "../../../../utils/types/globalTypes";
import { Trash2, CodeXml } from "lucide-react";
import { sonarId } from "../../../../utils/Fucntion/sonarId";

const AdminAllService = () => {
  const { data, isLoading } = useGetAllServiceQuery(undefined);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceData?.map((data: TService, idx: number) => (
          <div key={idx} className="border border-1 p-4 rounded-md relative">
            <p className="font-bold">{data?.serviceId}</p>
            <p>{data?.name}</p>

            <div className="absolute top-0 right-0">
              <p className="btn bg-green-500 hover:bg-green-600 text-white">
                <CodeXml />
              </p>
              <p
                className="btn bg-red-500 hover:bg-red-600 text-white"
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
