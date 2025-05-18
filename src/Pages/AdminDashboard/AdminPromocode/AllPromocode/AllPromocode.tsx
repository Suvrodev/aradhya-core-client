import {
  useDeletePromoCodeMutation,
  useGetAllPromocodeQuery,
} from "../../../../redux/api/features/PromoCode/promoCodeManagementApi";
import { toast } from "sonner";
import { TPromoCode } from "../../../../utils/types/globalTypes";
import UpdatePromoCode from "./UpdatePromoCode";

const AllPromocode = () => {
  const { data, isLoading } = useGetAllPromocodeQuery(undefined);
  const [deletePromoCode] = useDeletePromoCodeMutation();

  const handleDelete = async (id: string) => {
    toast.loading("Deleting promocode...", { id: "deletePromo" });
    await deletePromoCode(id);
    toast.success("Promocode deleted", { id: "deletePromo" });
  };

  if (isLoading) return <p className="text-white">Loading...</p>;

  return (
    <div className="">
      <h1 className="text-xl font-bold mb-6 text-white mt-4">All Promocodes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.data?.map((promo: TPromoCode) => (
          <div
            key={promo.promoId}
            className="bg-gradient-to-br from-teal-500 to-[#262F51] border border-teal-700 shadow-xl rounded-xl p-4 space-y-2 transition-all duration-300 hover:shadow-2xl text-white"
          >
            <h2 className="text-lg font-semibold text-blue-900">
              Code: {promo.promoCode}
            </h2>
            <p>ID: {promo.promoId}</p>
            <p>Percent: {promo.promoPercent}%</p>
            <p>Status: {promo.promoStatus}</p>
            <div className="flex justify-end gap-2 mt-3">
              <UpdatePromoCode promoId={promo?.promoId} />
              <button
                onClick={() => handleDelete(promo.promoId)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPromocode;
