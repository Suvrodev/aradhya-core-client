import { useForm } from "react-hook-form";
import { useAddServiceMutation } from "../../../redux/api/features/Service/serviceManagementApi";
import { toast } from "sonner";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import AdminAllService from "./AdminAllService/AdminAllService";

const AdminService = () => {
  const [addService] = useAddServiceMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data);
    toast.loading("Inserting Service", { id: sonarId });
    const res = await addService(data).unwrap();
    console.log("Res: ", res);
    if (res?.success) {
      toast.success("Service Added Successfully", { id: sonarId });
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Admin Service</h1>
      <div className="mt-4">
        <h1 className="text-xl font-bold">Add Service</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Service ID
              </label>
              <input
                type="text"
                {...register("serviceId", {
                  required: "Service ID is required",
                })}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
              />

              {errors.serviceId && (
                <p className="text-red-500 text-sm">
                  {String(errors.serviceId.message)}
                </p>
              )}
            </div>

            <div className="">
              <label className="block mb-2 text-sm font-medium">
                Service Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Service Name is required" })}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {String(errors.name.message)}
                </p>
              )}
            </div>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>

      <div className="mt-4">
        <h1 className="text-xl font-bold">All Service</h1>
        <AdminAllService />
      </div>
    </div>
  );
};

export default AdminService;
