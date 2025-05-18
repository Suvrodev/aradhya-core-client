import { Modal } from "antd";
import { Settings } from "lucide-react";

import {
  useGetSpecificPromoCodeQuery,
  useUpdatePromoCodeMutation,
} from "../../../../redux/api/features/PromoCode/promoCodeManagementApi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TPromoCode } from "../../../../utils/types/globalTypes";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";

interface IProps {
  promoId: string;
}

const UpdatePromoCode = ({ promoId }: IProps) => {
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

  //Fetching Promodata
  const [updatePromo] = useUpdatePromoCodeMutation();
  const { data, isLoading } = useGetSpecificPromoCodeQuery(promoId);
  const promoData: TPromoCode = data?.data;
  //   console.log("Come Promo Code data in Update:", promoData);

  const [promoStatus, setPromoStatus] = useState<string>(
    promoData?.promoStatus
  );

  useEffect(() => {
    if (promoData) {
      setPromoStatus(promoData?.promoStatus);
    }
  }, [promoData]);
  const handlePromoStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;
    setPromoStatus(status);
  };

  const handleUpdatePromoCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const promoId = Form.promoId.value;
    const promoCode = Form.promocode.value;
    const promoPercent = parseFloat(Form.promoPercent.value);
    const updateData = { promoCode, promoPercent, promoStatus };
    console.log("Form Data: ", updateData);
    toast.loading("Updating Promocode", { id: sonarId });
    const res = await updatePromo({ id: promoId, updateData }).unwrap();
    console.log("Res: ", res);
    if (res?.success) {
      toast.success("Promocode updated Successfully", { id: sonarId });
    }
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="">
      <div onClick={showModal}>
        <button className="w-[30px] h-[30px] bg-green-500 text-white flex justify-center items-center rounded-md p-2">
          <Settings />
        </button>
      </div>
      <Modal
        title="Update Promo Code"
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
        <div className="bg-gradient-to-br from-teal-500 to-[#262F51] text-white p-6 rounded-xl  shadow-2xl relative">
          <form onSubmit={handleUpdatePromoCode} className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Promo code ID</label>
              <input
                type="text"
                name="promoId"
                defaultValue={promoData?.promoId}
                disabled
                className="w-full border border-white/20 bg-white/10 px-3 py-2 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Promo Code</label>
              <input
                type="text"
                name="promocode"
                defaultValue={promoData?.promoCode}
                className="w-full border border-white/20 bg-white/10 px-3 py-2 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Promo Code Percent
              </label>
              <input
                type="number"
                name="promoPercent"
                defaultValue={promoData?.promoPercent}
                className="w-full border border-white/20 bg-white/10 px-3 py-2 rounded text-white ha"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Promo Code Status
              </label>
              <select
                name="promoStatus"
                id="promoStatus"
                value={promoStatus}
                onChange={handlePromoStatus}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>
            <button className="btn btn-primary text-center text-white">
              Update Promo Code
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdatePromoCode;
