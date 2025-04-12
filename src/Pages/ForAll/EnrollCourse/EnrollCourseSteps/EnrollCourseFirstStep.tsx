/* eslint-disable @typescript-eslint/no-explicit-any */
import "./EnrollCourseFirstStep.css";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../../redux/hook";
import { calculateDiscountedPrice } from "../../../../utils/Fucntion/calculateDiscount";
import { verifyToken } from "../../../../utils/Fucntion/verifyToken";
import { TPromoCode } from "../../../../utils/types/globalTypes";
import { useGetSpecificPromoCodeQuery } from "../../../../redux/api/features/PromoCode/promoCodeManagementApi";

import { useDispatch } from "react-redux";
import {
  selectAppliedPromoCode,
  selectAssignStudentEmail,
  selectAssignStudentId,
  selectAssignStudentName,
  selectAssignStudentPhone,
  selectBatchId,
  selectBatchName,
  selectCourseDiscount,
  selectCourseId,
  selectCoursePrice,
  selectFinalPrice,
  selectPromoCode,
  selectPromoCodeStatus,
  selectPromoPercent,
} from "../../../../redux/api/features/AssignStudent/assignStudentSlice";

interface IProps {
  batchId: string;
  courseId: string;
  batchName: string;
  courseDuration: string;
  courseTitle: string;
  courseImage: string;
  courseStartDate: string;
  coursePrice: number;
  courseDiscount: number;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const EnrollCourseFirstStep = ({
  batchId,
  batchName,
  courseId,
  courseTitle,
  courseImage,
  courseDuration,
  courseStartDate,
  coursePrice,
  courseDiscount,
  activeStep,
  setActiveStep,
}: IProps) => {
  const dispatch = useDispatch();

  //Retrive promocode
  const { data: promocodeData, isLoading: PromoLoading } =
    useGetSpecificPromoCodeQuery(import.meta.env.VITE_PROMOCODE_ID);
  const promoData: TPromoCode = promocodeData?.data;
  // console.log("Promo data: ", promoData);

  //Distructure Token
  const { token } = useAppSelector((state) => state.auth);
  let student: any;
  if (token) {
    student = verifyToken(token);
  }

  ///totalPrice will be showed as final price
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState<number>(0); // New state for total price

  const initialTotalPrice = calculateDiscountedPrice(
    coursePrice,
    courseDiscount
  );

  // Update total price based on applied discount
  useEffect(() => {
    const updatedPrice =
      initialTotalPrice - (appliedDiscount / 100) * initialTotalPrice;
    setTotalPrice(Math.ceil(updatedPrice));
  }, [appliedDiscount, initialTotalPrice]);

  const applyCouponCode = () => {
    if (
      promoData?.promoStatus === "yes" &&
      promoCode === promoData?.promoCode
    ) {
      const newDiscount = promoData.promoPercent;
      setAppliedDiscount(newDiscount);
      setIsCouponApplied(true);
      setErrorMessage(""); // Clear error message if promo code is valid
      setSuccessMessage("Successfully promocode Applied");
    } else {
      setErrorMessage("Invalid or inactive promo code"); // Display error message if promo code is invalid
      setSuccessMessage("");
    }
  };

  const handleGoPaymentPage = () => {
    if (!batchId) {
      alert("Batch will be created later");
      return;
    }
    dispatch(selectAssignStudentId(student?.studentId));
    dispatch(selectAssignStudentName(student?.name));
    dispatch(selectAssignStudentEmail(student?.email));
    dispatch(selectAssignStudentPhone(student?.phone));
    dispatch(selectCourseId(courseId));
    dispatch(selectBatchId(batchId));
    dispatch(selectBatchName(batchName));
    dispatch(selectCoursePrice(coursePrice));
    dispatch(selectCourseDiscount(courseDiscount));
    dispatch(selectPromoCodeStatus(promoData?.promoStatus));
    dispatch(selectPromoCode(promoData?.promoCode));
    dispatch(selectAppliedPromoCode(promoCode));
    dispatch(selectPromoPercent(promoData?.promoPercent));
    dispatch(selectFinalPrice(totalPrice));
    setActiveStep(activeStep + 1);
  };

  if (PromoLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center  text-white px-10">
      <h1 className="text-3xl font-bold text-center text-white mb-6 underline underline-offset-4">
        Enroll Course
      </h1>

      <div className="flex flex-col-reverse md:flex-row w-full">
        <div className="w-full md:w-[70%] flex flex-col gap-4">
          <h1 className="text-4xl font-bold italic text-center md:text-start">
            {courseTitle}
          </h1>
          <p className="text-xl font-bold">Course duration: {courseDuration}</p>
          <p className="text-xl font-bold">Start Date: {courseStartDate}</p>
        </div>
        <div className="w-full md:w-[30%]">
          <img
            src={courseImage}
            className="w-full md:w-[450px] rounded-md"
            alt=""
          />
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-4 underline underline-offset-4">
          Student Detail
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Student ID */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-300 mb-1 w-32">
              Student ID
            </label>
            <input
              defaultValue={student?.studentId}
              type="text"
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
              disabled
            />
          </div>

          {/* Student Name */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-300 mb-1 w-32">
              Student Name
            </label>
            <input
              defaultValue={student?.name}
              type="text"
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
              disabled
            />
          </div>

          {/* Batch ID */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-300 mb-1 w-32">
              Batch ID
            </label>
            <input
              defaultValue={batchId}
              type="text"
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
              disabled
            />
          </div>

          {/* Student Email */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-300 mb-1 w-32">
              Student Email
            </label>
            <input
              defaultValue={student?.email}
              type="email"
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full disabled:text-gray-400"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <h1 className="text-3xl font-bold text-center my-4 underline underline-offset-4">
          Payment Detail
        </h1>
        <div className=" w-full">
          <div className="w-full leading-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <h1 className="text-[18px]">Promo Code:</h1>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="px-4 bg-gray-700 text-white border border-gray-600 rounded-md"
                placeholder="Enter Coupon Code"
                disabled={isCouponApplied}
              />
              <button
                className="btn btn-sm applyCoupon "
                onClick={applyCouponCode}
                disabled={isCouponApplied}
              >
                {isCouponApplied ? "Applied" : "Apply"}
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mt-2">{successMessage}</p>
            )}
          </div>

          <div className="w-full leading-8 mt-4">
            <h1 className="text-[18px]">Course Price: {coursePrice} ৳</h1>
            <h1 className="text-[18px]">Discount: {courseDiscount} %</h1>
            {isCouponApplied && (
              <h1 className="text-[18px]">
                Promocode Discount: {promoData?.promoPercent} %
              </h1>
            )}
            <h1 className="text-[18px]">
              Total Price: {totalPrice}৳{" "}
              <span className="text-[12px] text-green-500">
                (এই Ammount টাই আমাদের bKash/Nagad এ send money করুন)
              </span>
            </h1>
          </div>
        </div>
      </div>

      <button
        className="btn btn-lg applyButton mt-6"
        onClick={() => handleGoPaymentPage()}
      >
        Next
      </button>
    </div>
  );
};

export default EnrollCourseFirstStep;
