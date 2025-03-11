/* eslint-disable @typescript-eslint/no-explicit-any */
import "./EnrollCourseFirstStep.css";
import { useState, useEffect } from "react";
import { useGetSpecificBatchUnderCourseQuery } from "../../../../redux/api/features/Batch/batchManagementApi";
import { useAppSelector } from "../../../../redux/hook";
import { calculateDiscountedPrice } from "../../../../utils/Fucntion/calculateDiscount";
import { verifyToken } from "../../../../utils/Fucntion/verifyToken";
import { TBatch, TPromoCode } from "../../../../utils/types/globalTypes";
import { useGetSpecificPromoCodeQuery } from "../../../../redux/api/features/PromoCode/promoCodeManagementApi";

interface IProps {
  courseId: string;
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
  courseId,
  courseTitle,
  courseImage,
  courseDuration,
  courseStartDate,
  coursePrice,
  courseDiscount,
}: IProps) => {
  const { data: promocodeData, isLoading: PromoLoading } =
    useGetSpecificPromoCodeQuery(import.meta.env.VITE_PROMOCODE_ID);
  const promoData: TPromoCode = promocodeData?.data;

  const { data, isLoading: batchLoading } =
    useGetSpecificBatchUnderCourseQuery(courseId);
  const onGoingBatch: TBatch = data?.data;

  const { token } = useAppSelector((state) => state.auth);
  let student: any;
  if (token) {
    student = verifyToken(token);
  }

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
    setTotalPrice(updatedPrice);
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

  if (batchLoading || PromoLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-[#2D3035] text-white px-10">
      <h1 className="text-3xl font-bold text-center text-white mb-6 underline">
        Enroll Course
      </h1>

      <div className="flex w-full">
        <div className="w-[70%] flex flex-col gap-4">
          <h1 className="text-4xl font-bold italic">{courseTitle}</h1>
          <p className="text-xl font-bold">Course duration: {courseDuration}</p>
          <p className="text-xl font-bold">Start Date: {courseStartDate}</p>
        </div>
        <div className="w-[30%]">
          <img src={courseImage} className="w-[350px] rounded-md" alt="" />
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-4 underline">
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
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full"
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
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full"
              disabled
            />
          </div>

          {/* Batch ID */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-300 mb-1 w-32">
              Batch ID
            </label>
            <input
              defaultValue={onGoingBatch?.batchId}
              type="text"
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full"
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
              className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <h1 className="text-3xl font-bold text-center my-4 underline">
          Payment Detail
        </h1>
        <div className=" w-full">
          <div className="w-full leading-8">
            <div className="flex items-center gap-2">
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
            <h1 className="text-[18px]">Discount: {courseDiscount} ৳</h1>
            <h1 className="text-[18px]">
              Total Price: {totalPrice}৳{" "}
              <span className="text-[12px] text-green-500">
                (এই Ammount টাই আমাদের bKash/Nagad এ send money করুন)
              </span>
            </h1>
          </div>
        </div>
      </div>

      <button className="btn btn-lg bg-purple-500 text-white mt-6">
        Submit
      </button>
    </div>
  );
};

export default EnrollCourseFirstStep;
