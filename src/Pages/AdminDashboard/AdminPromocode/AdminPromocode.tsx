import { ChangeEvent, FormEvent, useState } from "react";

const AdminPromocode = () => {
  const [promoStatus, setPromoStatus] = useState<boolean>(false);

  const handlePromoStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value === "true";
    setPromoStatus(status);
    console.log("Promo Status: ", status);
  };

  const handlePromocodeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;

    const promoId = Form.promoId.value;
    const promoCode = Form.promocode.value;
    const promoPercent = parseFloat(Form.promoPercent.value);

    const formData = { promoId, promoCode, promoPercent, promoStatus };
    console.log("Form Data: ", formData);
  };
  return (
    <div className="pagePadding">
      <h1 className="text-xl font-bold">Promo Code</h1>

      <div className="mt-4">
        <h1 className="text-xl font-bold">Add Service</h1>

        <form onSubmit={handlePromocodeSubmit} className="mt-10">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Promo code ID
              </label>
              <input
                type="text"
                name="promoId"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                required
              />
            </div>

            <div className="">
              <label className="block mb-2 text-sm font-medium">
                Promo Code
              </label>
              <input
                type="text"
                name="promocode"
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
                value={promoStatus.toString()}
                onChange={handlePromoStatus}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPromocode;
