import { useAppSelector } from "../../../../redux/hook";
import { verifyToken } from "../../../../utils/Fucntion/verifyToken";

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
  // courseId,
  courseTitle,
  courseImage,
  courseDuration,
  courseStartDate,
  coursePrice,
  courseDiscount,
}: // activeStep,
// setActiveStep,
IProps) => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  console.log("USer ===========", user);

  return (
    <div className="flex flex-col items-center justify-center   bg-[#2D3035] text-white underline-offset-8 px-10">
      <h1 className="text-3xl font-bold text-center text-white mb-6 underline">
        Enroll Course
      </h1>

      <div className="flex bg-purple-400 w-full">
        <div className="w-[70%] flex flex-col gap-4">
          <h1 className="text-4xl font-bold italic">{courseTitle}</h1>
          <p className="text-xl ">
            Course duration: <span>{courseDuration}</span>
          </p>
          <p className="text-xl ">
            Start Date: <span>{courseStartDate}</span>
          </p>
        </div>
        <div className="w-[30%} ">
          <img src={courseImage} className="w-[350px] rounded-md" alt="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Name */}

        {/* Batch ID */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Batch ID
          </label>
          <input
            type="text"
            name="batchId"
            className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter batch ID"
            required
            disabled
          />
        </div>

        {/* Student ID */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Student ID
          </label>
          <input
            type="text"
            name="studentId"
            className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter student ID"
            required
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
            className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter student name"
            required
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
            className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter student email"
            required
          />
        </div>

        {/* Student Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Student Phone
          </label>
          <input
            type="tel"
            name="studentPhone"
            className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter student phone"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default EnrollCourseFirstStep;
