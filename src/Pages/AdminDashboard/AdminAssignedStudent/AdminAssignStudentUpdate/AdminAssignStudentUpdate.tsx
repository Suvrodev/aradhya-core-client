import { Modal } from "antd";
import { Settings } from "lucide-react";
import { TAssignedStudent } from "../../../../utils/types/globalTypes";
import { ChangeEvent, FormEvent, useState } from "react";

interface IProps {
  data: TAssignedStudent;
}

const AdminAssignStudentUpdate = ({ data }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  /**
   * Start Functionality
   */

  // Destructure data
  const {
    studentId,
    studentName,
    studentEmail,
    studentPhone,
    courseId,
    batchId,
    coursePrice,
    courseDiscount,
    promoCodeStatus,
    promoCode,
    appliedpromoCode,
    promoPercent,
    finalPrice,
    paymentGateWay,
    status: statusCome,
    transactionId,
    checkTransactionId,
    transactionMobileNumber,
  } = data;

  const [status, setStatus] = useState(statusCome);

  const handleStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const res = event.target.value;

    // console.log("Res: ", res);
    if (res == "true") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    const checkTransactionId = Form.checkTransactionId.value;
    const updateData = {
      status,
      checkTransactionId,
    };
    console.log("Update Data: ", updateData);
  };

  return (
    <div>
      <button
        onClick={showModal}
        className="w-[30px] h-[30px] bg-gradient-to-r from-blue-500 to-purple-500 text-white flex justify-center items-center rounded-md p-2 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
      >
        <Settings className="w-4 h-4" />
      </button>
      <Modal
        title="Update Assign Student"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={"90%"}
      >
        <form onSubmit={handleSubmit} className=" bg-gray-900">
          <div className="grid grid-cols-4 gap-6 p-6 rounded-lg">
            {/* Student ID */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                placeholder="Student ID"
                defaultValue={studentId}
                disabled
                className="disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Student Name
              </label>
              <input
                type="text"
                name="studentName"
                placeholder="Student Name"
                defaultValue={studentName}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Student Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Student Email
              </label>
              <input
                type="email"
                name="studentEmail"
                placeholder="Student Email"
                defaultValue={studentEmail}
                disabled
                className="disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Student Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Student Phone
              </label>
              <input
                type="text"
                name="studentPhone"
                placeholder="Student Phone"
                defaultValue={studentPhone}
                disabled
                className="disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Course ID */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Course ID
              </label>
              <input
                type="text"
                name="courseId"
                placeholder="Course ID"
                defaultValue={courseId}
                disabled
                className="disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Batch ID */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Batch ID
              </label>
              <input
                type="text"
                name="batchId"
                placeholder="Batch ID"
                defaultValue={batchId}
                disabled
                className="disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Course Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Course Price
              </label>
              <input
                type="number"
                name="coursePrice"
                placeholder="Course Price"
                defaultValue={coursePrice}
                disabled
                className="disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Course Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Course Discount
              </label>
              <input
                type="number"
                name="courseDiscount"
                placeholder="Course Discount"
                defaultValue={courseDiscount}
                disabled
                className="disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Promo Code Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Promo Code Status
              </label>
              <input
                type="text"
                name="promoCodeStatus"
                defaultValue={promoCodeStatus}
                disabled
                className="disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Promo Code */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Promo Code
              </label>
              <input
                type="text"
                name="promoCode"
                placeholder="Promo Code"
                defaultValue={promoCode}
                disabled
                className="disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Applied Promo Code */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Applied Promo Code
              </label>
              <input
                type="text"
                name="appliedpromoCode"
                placeholder="Applied Promo Code"
                defaultValue={appliedpromoCode}
                disabled
                className="disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Promo Percent */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Promo Percent
              </label>
              <input
                type="number"
                name="promoPercent"
                placeholder="Promo Percent"
                defaultValue={promoPercent}
                disabled
                className=" disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Final Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Final Price
              </label>
              <input
                type="number"
                name="finalPrice"
                placeholder="Final Price"
                defaultValue={finalPrice}
                disabled
                className=" disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Payment Gateway */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Payment Gateway
              </label>
              <input
                type="text"
                name="paymentGateWay"
                placeholder="Final Price"
                defaultValue={paymentGateWay}
                disabled
                className=" disabled:text-gray-400 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Assign Status
              </label>
              <select
                value={status?.toString()}
                onChange={handleStatus}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Transaction ID
              </label>
              <input
                type="text"
                name="transactionId"
                placeholder="Transaction ID"
                defaultValue={transactionId}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/*Check Transaction ID */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Check Transaction ID
              </label>
              <input
                type="text"
                name="checkTransactionId"
                placeholder="Transaction ID"
                defaultValue={checkTransactionId}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>

            {/* Transaction Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Transaction Mobile Number
              </label>
              <input
                type="text"
                name="transactionMobileNumber"
                placeholder="Transaction Mobile Number"
                defaultValue={transactionMobileNumber}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center">
            {/* Submit Button */}
            <button
              type="submit"
              className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminAssignStudentUpdate;
