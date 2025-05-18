import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  useGetSpecificPromoCodeQuery,
  useUpdatePromoCodeMutation,
} from "../../../redux/api/features/PromoCode/promoCodeManagementApi";
import LoadingPage from "../../../Component/LoadingPage/LoadingPage";
import { TPromoCode } from "../../../utils/types/globalTypes";
import { toast } from "sonner";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import { useTitle } from "../../../Component/hook/useTitle";
import MixingPromoCode from "./MixingPromoCode/MixingPromoCode";

const AdminPromocode = () => {
  useTitle("Admin-Promocode");
  const [updatePromo] = useUpdatePromoCodeMutation();
  const { data, isLoading } = useGetSpecificPromoCodeQuery(
    import.meta.env.VITE_PROMOCODE_ID
  );
  const promoData: TPromoCode = data?.data;
  // console.log("Promo Data: ", promoData);

  const [promoStatus, setPromoStatus] = useState<string>(
    promoData?.promoStatus
  );

  const handlePromoStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;
    setPromoStatus(status);
  };
  useEffect(() => {
    if (promoData) {
      setPromoStatus(promoData?.promoStatus);
    }
  }, [promoData]);
  console.log("Promo Status: ", promoStatus);

  const handlePromocodeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;

    const promoCode = Form.promocode.value;
    const promoPercent = parseFloat(Form.promoPercent.value);

    const formData = { promoCode, promoPercent, promoStatus };
    console.log("Form Data: ", formData);
    const id = promoData?.promoId;
    const updateData = formData;
    toast.loading("Updating Promocode", { id: sonarId });
    const res = await updatePromo({ id, updateData }).unwrap();
    if (res?.success) {
      toast.success(res?.message, { id: sonarId });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="pagePadding">
      <div className="flex flex-col md:flex-row items-start justify-center gap-10">
        <div className="mt-4 w-full md:w-1/2 ">
          <h1 className="text-xl font-bold">Promo Code</h1>
          <form onSubmit={handlePromocodeSubmit} className="mt-10">
            <div className="w-full flex flex-col gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Promo code ID
                </label>
                <input
                  type="text"
                  defaultValue={promoData?.promoId}
                  name="promoId"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                  disabled
                />
              </div>

              <div className="">
                <label className="block mb-2 text-sm font-medium">
                  Promo Code
                </label>
                <input
                  type="text"
                  name="promocode"
                  defaultValue={promoData?.promoCode}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                  required
                />
              </div>

              <div className="">
                <label className="block mb-2 text-sm font-medium">
                  Promo Code Percent
                </label>
                <input
                  type="number"
                  name="promoPercent"
                  defaultValue={promoData?.promoPercent}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                />
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium">
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
              <div>
                <button className="btn btn-primary text-white">
                  Update Promocode
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Add PromoCode */}
        <div className="mt-4 w-full md:w-1/2">
          <h1 className="text-xl font-bold">Mixing Promocode</h1>
          <MixingPromoCode />
        </div>
      </div>
    </div>
  );
};

export default AdminPromocode;
