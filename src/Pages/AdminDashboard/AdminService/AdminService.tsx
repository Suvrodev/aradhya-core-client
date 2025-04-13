import { useAddServiceMutation } from "../../../redux/api/features/Service/serviceManagementApi";
import { toast } from "sonner";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import AdminAllService from "./AdminAllService/AdminAllService";
import { ChangeEvent, FormEvent, useState } from "react";
import { useTitle } from "../../../Component/hook/useTitle";

const AdminService = () => {
  useTitle("Admin-Service");
  const [addService] = useAddServiceMutation();

  const [serviceExists, setServiceExists] = useState("yes");

  const handleServiceExists = (event: ChangeEvent<HTMLSelectElement>) => {
    const res = event.target.value;
    setServiceExists(res);
  };

  const handleServiceSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const serviceId = Form.serviceId.value;
    const name = Form.servicename.value;
    const order = Form.order.value;
    if (!serviceExists) {
      toast.error("Select Service Exists", { id: sonarId });
      return;
    }
    const formData = { serviceId, name, order, serviceExists };
    // console.log("Form Data: ", formData);
    toast.loading("Inserting Service", { id: sonarId });
    const res = await addService(formData).unwrap();
    console.log("Res: ", res);
    if (res?.success) {
      toast.success("Service Added Successfully", { id: sonarId });
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Admin Service</h1>
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <div className=" w-full md:w-1/2 ">
          <h1 className="text-xl font-bold">Add Service</h1>

          <form onSubmit={handleServiceSubmit} className="mt-10">
            <div className="w-full flex flex-col gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Service ID
                </label>
                <input
                  type="text"
                  name="serviceId"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                  placeholder="Enter Service id"
                  required
                />
              </div>

              <div className="">
                <label className="block mb-2 text-sm font-medium">
                  Service Name
                </label>
                <input
                  type="text"
                  name="servicename"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                  placeholder="Enter Service Name"
                  required
                />
              </div>
              {/* Order */}
              <div className="">
                <label className="block mb-2 text-sm font-medium">Order</label>
                <input
                  type="number"
                  name="order"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                  placeholder="Enter Service Order"
                  required
                />
              </div>

              {/* Service Exists */}
              <div className="">
                <label className="block mb-2 text-sm font-medium">
                  Service Exists
                </label>
                <select
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                  value={serviceExists}
                  onChange={handleServiceExists}
                >
                  <option value="" disabled>
                    Select One
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>

        <div className="mt-4 w-full md:w-1/2 h-[550px]  overflow-auto">
          <h1 className="text-xl font-bold">All Service</h1>
          <AdminAllService />
        </div>
      </div>
    </div>
  );
};

export default AdminService;
