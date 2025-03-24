import { Modal } from "antd";
import { Settings } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { TService } from "../../../../utils/types/globalTypes";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import { useUpdateServiceMutation } from "../../../../redux/api/features/Service/serviceManagementApi";

interface IProps {
  data: TService;
}

const AdminUpdateService = ({ data }: IProps) => {
  //   Modal Default Class start
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //   Modal Default Class end

  /**
   * Start Logic From Here
   */

  //   console.log("Flim Data: ", data);
  const [updateService] = useUpdateServiceMutation();
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
    const updateData = { serviceId, name, order, serviceExists };
    console.log("updateData : ", updateData);
    toast.loading("Updating Service", { id: sonarId });
    const res = await updateService({ id: serviceId, updateData }).unwrap();
    console.log("Res: ", res);
    if (res?.status) {
      toast.success("Service Updated Successfully", { id: sonarId });
    }
  };

  return (
    <div className="">
      <div onClick={showModal}>
        <button className="w-[30px] h-[30px] bg-green-500 text-white flex justify-center items-center rounded-md p-2">
          <Settings />
        </button>
      </div>
      <Modal
        title="Update Service"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <div className="">
          <h1 className="font-bold text-xl">Update Service</h1>

          <form onSubmit={handleServiceSubmit} className="mt-10">
            <div className="w-full flex flex-col gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Service ID
                </label>
                <input
                  type="text"
                  name="serviceId"
                  defaultValue={data?.serviceId}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500 disabled:text-gray-400"
                  placeholder="Enter Service id"
                  required
                  disabled
                />
              </div>

              <div className="">
                <label className="block mb-2 text-sm font-medium">
                  Service Name
                </label>
                <input
                  type="text"
                  name="servicename"
                  defaultValue={data?.name}
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
                  defaultValue={data?.order}
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
      </Modal>
    </div>
  );
};

export default AdminUpdateService;
