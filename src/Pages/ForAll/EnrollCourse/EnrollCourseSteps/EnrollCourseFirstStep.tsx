import "./EnrollCourseFirstStep.css";
import { useGetSpecificBatchUnderCourseQuery } from "../../../../redux/api/features/Batch/batchManagementApi";
import { useAppSelector } from "../../../../redux/hook";
import { calculateDiscountedPrice } from "../../../../utils/Fucntion/calculateDiscount";
import { verifyToken } from "../../../../utils/Fucntion/verifyToken";
import { TBatch } from "../../../../utils/types/globalTypes";

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
}: // activeStep,
// setActiveStep,
IProps) => {
  const { data, isLoading } = useGetSpecificBatchUnderCourseQuery(courseId);

  const onGoingBatch: TBatch = data?.data;
  console.log("On Going Batch: ", onGoingBatch);

  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let student: any;
  if (token) {
    student = verifyToken(token);
  }

  console.log("Student ===========", student);

  const appyCouponCode = () => {
    console.log("Apply Coupon Code");
  };

  return (
    <div className="flex flex-col items-center justify-center   bg-[#2D3035] text-white underline-offset-8 px-10">
      <h1 className="text-3xl font-bold text-center text-white mb-6 underline">
        Enroll Course
      </h1>

      <div className="flex w-full">
        <div className="w-[70%] flex flex-col gap-4">
          <h1 className="text-4xl font-bold italic">{courseTitle}</h1>
          <p className="text-xl font-bold ">
            Course duration: <span>{courseDuration}</span>
          </p>
          <p className="text-xl font-bold ">
            Start Date: <span>{courseStartDate}</span>
          </p>
        </div>
        <div className="w-[30%} ">
          <img src={courseImage} className="w-[350px] rounded-md" alt="" />
        </div>
      </div>

      <div className="">
        <h1 className="text-3xl font-bold text-center text-white my-4 underline">
          Student Detail
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Course Name */}

          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Student ID
            </label>
            <input
              defaultValue={student?.studentId}
              type="text"
              name="studentId"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter student ID"
              required
              disabled
            />
          </div>

          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Student Name
            </label>
            <input
              defaultValue={student?.name}
              type="text"
              name="studentName"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter student name"
              disabled
            />
          </div>

          {/* Batch ID */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Batch ID
            </label>
            <input
              defaultValue={onGoingBatch?.batchId}
              type="text"
              name="batchId"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter batch ID"
              disabled
            />
          </div>

          {/* Student Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Student Email
            </label>
            <input
              defaultValue={student?.email}
              type="email"
              name="studentEmail"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter student email"
              disabled
            />
          </div>

          {/* Student Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Student Phone
            </label>
            <input
              defaultValue={student?.phone}
              type="tel"
              name="studentPhone"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter student phone"
              disabled
            />
          </div>
        </div>
      </div>
      <div className=" w-full h-full">
        <h1 className="text-3xl font-bold text-center text-white my-4 underline ">
          Payment Detail
        </h1>
        <div className=" flex items-start w-full  ">
          <div className="w-1/2 leading-8 ">
            <h1 className="text-[18px]">Course Price: ${coursePrice} ৳ </h1>
            <h1 className="text-[18px]">Discount: ${courseDiscount} ৳</h1>
            <h1 className="text-[18px]">
              Total Price:{" "}
              {calculateDiscountedPrice(coursePrice, courseDiscount)}৳
            </h1>
          </div>
          <div className=" w-1/2 leading-8">
            <div className="flex items-center gap-2">
              <h1 className="text-[18px]">Coupon </h1>
              <input
                type="text"
                name="studentPhone"
                className="   px-4  bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter Coupon Code"
              />
            </div>
            <button
              className="btn btn-sm applyCoupon mt-2"
              onClick={() => appyCouponCode()}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourseFirstStep;
