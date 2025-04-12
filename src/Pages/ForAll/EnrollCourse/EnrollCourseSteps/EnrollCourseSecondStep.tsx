import { useState } from "react";
import goCall from "../../../../utils/Fucntion/goCall";
import { useAddAssignStudentMutation } from "../../../../redux/api/features/AssignStudent/assignStudentManagementApi";
import { useAppSelector } from "../../../../redux/hook";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";

interface IProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const EnrollCourseSecondStep = ({ activeStep, setActiveStep }: IProps) => {
  const {
    studentId: studentIdSlice,
    studentName: studentNameSlice,
    studentEmail: studentEmailSlice,
    studentPhone: studentPhoneSlice,
    courseId: courseIdSlice,
    batchId: batchIdSlice,
    batchName: batchNameSlice,
    coursePrice: coursePriceSlice,
    courseDiscount: courseDiscountSlice,
    promoCodeStatus: promoCodeStatusSlice,
    promoCode: promoCodeSlice,
    appliedpromoCode: appliedpromoCodeSlice,
    promoPercent: promoPercentSlice,
    finalPrice: finalPriceSlice,
  } = useAppSelector((state) => state.assignStudent);

  const [makeAssign] = useAddAssignStudentMutation();
  // const [paymentGateWay, setPaymentGateWay] = useState("");
  const [transactionId, setTransactionId] = useState(""); // Transaction ID state
  const [transactionMobileNumber, setTransactionMobileNumber] = useState(""); // Transaction mobile state

  const handleSubmitPayment = async () => {
    // if (!paymentGateWay) {
    //   alert("Please Select Your payment getway");
    //   return;
    // }
    if (!transactionId) {
      alert("Didn't give transaction id");
      return;
    }
    if (!transactionMobileNumber) {
      alert("Didn't give transaction Mobile number");
      return;
    }

    const assignData = {
      studentId: studentIdSlice,
      studentName: studentNameSlice,
      studentEmail: studentEmailSlice,
      studentPhone: studentPhoneSlice,
      courseId: courseIdSlice,
      batchId: batchIdSlice,
      batchName: batchNameSlice,
      coursePrice: coursePriceSlice,
      courseDiscount: courseDiscountSlice,
      promoCodeStatus: promoCodeStatusSlice,
      promoCode: promoCodeSlice,
      appliedpromoCode: appliedpromoCodeSlice,
      promoPercent: promoPercentSlice,
      finalPrice: finalPriceSlice,
      // paymentGateWay,
      transactionId,
      transactionMobileNumber,
    };
    console.log("Assign Data: ", assignData);

    toast.loading("Assigning Student", { id: sonarId });
    const res = await makeAssign(assignData).unwrap();
    console.log("Res: ", res);
    if (res?.success) {
      toast.success("You are assigned Successfully", { id: sonarId });
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white px-4 py-8 sm:px-10 sm:py-12">
      {/* Transaction Details Section */}
      <div className="w-full mt-6">
        <h1 className="text-3xl font-bold text-center my-4 underline underline-offset-4">
          Transaction Details
        </h1>
        {/* Payment Instructions */}
        <div className="bg-purple-900/50 p-6 rounded-lg shadow-lg border border-purple-700 mb-6">
          <p className="text-lg text-purple-100 leading-relaxed">
            <span className="font-bold text-purple-300">Course Enroll</span>{" "}
            করার জন্য{" "}
            <span
              onClick={() => goCall("01609593186")}
              className="text-blue-400 hover:text-blue-300 cursor-pointer underline"
            >
              01609593186
            </span>{" "}
            এই নাম্বারে{" "}
            <span className="text-[#EC0C71] font-semibold">bKash</span> এ{" "}
            {/* <span className="text-[#FF7135] font-semibold">Nagad</span> এ{" "} */}
            <span className="font-bold text-purple-300">Total Price</span> send
            money করবেন এবং send Money করার সময় আপনার{" "}
            <span className="text-teal-500 font-bold">
              student id ({studentIdSlice}){" "}
            </span>{" "}
            অবশ্যই reference হিসেবে দিবেন।তার পরে Transaction ID এবং যে Mobile
            Number দিয়ে send money করবেন সেই নাম্বারটি নিচের ফর্মে দিয়ে Submit
            করবেন।
          </p>
        </div>

        {/* Payment Procesure Image */}
        <div className="bg-purple-900/50 p-6 rounded-lg shadow-lg border border-purple-700 mb-6">
          <img
            src="https://i.ibb.co.com/x832LqQ8/b-Kash-Transaction.png"
            alt=""
          />
        </div>

        {/* Warning Message */}
        <div className="bg-red-900/50 p-6 rounded-lg shadow-lg border border-red-700">
          <p className="text-lg text-red-100 leading-relaxed">
            <span className="font-bold text-red-300">বিশেষ সতর্কীকরণ:</span> ভুল
            নাম্বারে send money করলে আপনি কোর্সে Enrollment করতে পারবেন না। এবং
            সে জন্য কর্তৃপক্ষ কোনো ভাবে দায়ী থাকবে না। দয়া করে নাম্বার এবং
            Transaction ID সঠিকভাবে প্রদান করুন।
          </p>
          <p className="text-center font-bold text-white  bg-red-500 py-2 px-4 rounded-md border border-red-700 inline-block mx-auto mt-3 animate-pulse">
            ⚠️ Nagad এ send money গ্রহন যোগ্য নয় ⚠️
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6">
          <h1 className="font-medium">
            Your Student id:{" "}
            <span className="font-bold text-green-500">{studentIdSlice}</span>{" "}
          </h1>
          <h1 className="font-medium">
            Your Total Price:{" "}
            <span className="font-bold text-green-500">{finalPriceSlice}</span>{" "}
          </h1>
          {/* Payment Way Dropdown */}
          {/* <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <label className="text-sm font-medium text-gray-300 mb-1 w-32">
              Payment Way
            </label>
            <select
              value={paymentGateWay}
              onChange={(e) => setPaymentGateWay(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full"
            >
              <option value="">Select Payment Method</option>
              <option value="bKash" className="bg-[#E3106E]">
                bKash
              </option>
              <option value="Nagad" className="bg-[#FF7135]">
                Nagad
              </option>
            </select>
          </div> */}

          {/* Transaction ID */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <label className="text-sm font-medium text-gray-300 mb-1 w-32">
              Transaction ID
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full"
              placeholder="Enter Transaction ID"
            />
          </div>

          {/* Transaction Mobile Number */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <label className="text-sm font-medium text-gray-300 mb-1 w-32">
              Transaction Mobile Number
            </label>
            <input
              type="text"
              value={transactionMobileNumber}
              onChange={(e) => setTransactionMobileNumber(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full"
              placeholder="Enter Transaction Mobile Number"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="btn btn-lg applyButton mt-6"
            onClick={() => handleSubmitPayment()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourseSecondStep;
