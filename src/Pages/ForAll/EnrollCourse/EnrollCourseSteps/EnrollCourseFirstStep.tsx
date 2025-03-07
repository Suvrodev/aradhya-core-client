import { FormEvent } from "react";
import { useAppSelector } from "../../../../redux/hook";
import { verifyToken } from "../../../../utils/Fucntion/verifyToken";

interface IProps {
  courseId: string;
  courseTitle: string;
  courseImage: string;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const BuyCourseFirstStep = ({
  courseId,
  courseTitle,
  courseImage,
  activeStep,
  setActiveStep,
}: IProps) => {
  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  console.log("USer ===========", user);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // You can handle the form data here
    setActiveStep(activeStep + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-purple-500">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Enroll Course
      </h1>

      <div className="flex ">
        <div>
          <p className="text-xl">
            <span>Name: </span>
            <span>{user?.name}</span>
          </p>
          <p className="text-xl">
            <span>Email: </span>
            <span>{user?.email}</span>
          </p>
          <p className="text-xl">
            <span>Batch: </span>
            <span>Batch-1</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <img
            src={courseImage}
            className="w-[150px] h-[80px] rounded-md"
            alt=""
          />
          <p className="text-xl font-bold "> {courseTitle} </p>
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

export default BuyCourseFirstStep;
