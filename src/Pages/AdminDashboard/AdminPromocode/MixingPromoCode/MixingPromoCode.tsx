import { ChangeEvent, FormEvent, useState } from "react";
import { useAddPromocodeMutation } from "../../../../redux/api/features/PromoCode/promoCodeManagementApi";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";

const MixingPromoCode = () => {
  const [addPromoCode] = useAddPromocodeMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [promoStatus, setPromoStatus] = useState<string>("yes");
  const handlePromoStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;
    setPromoStatus(status);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const promoId = Form.promoId.value;
    const promoCode = Form.promocode.value;
    const promoPercent = parseFloat(Form.promoPercent.value);
    const formData = { promoId, promoCode, promoPercent, promoStatus };
    console.log("Form Data: ", formData);
    toast.loading("Adding Promocode", { id: sonarId });
    const res = await addPromoCode(formData).unwrap();
    console.log("Res: ", res);
    if (res?.success) {
      toast.success("Added Promocode Successfully", { id: sonarId });
    }
  };

  return (
    <div className="">
      <button
        onClick={handleOpenModal}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Add Promocode
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-gradient-to-br from-teal-500 to-[#262F51] text-white p-6 rounded-xl w-[450px] shadow-2xl relative">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Add Promocode
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">
                  Promo code ID
                </label>
                <input
                  type="text"
                  name="promoId"
                  className="w-full border border-white/20 bg-white/10 px-3 py-2 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Promo Code</label>
                <input
                  type="text"
                  name="promocode"
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

              {/* Modal Footer */}
              <div className="mt-6 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-sm text-white hover:text-red-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-white text-[#262F51] font-semibold px-4 py-2 rounded hover:bg-teal-200"
                >
                  Add Promocode
                </button>
              </div>
            </form>

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-white hover:text-teal-300 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MixingPromoCode;
