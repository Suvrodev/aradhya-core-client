import { toast } from "sonner";
import DeleteComponent from "../../../../Component/DeleteComponent/DeleteComponent";
import { useDeleteBatchMutation } from "../../../../redux/api/features/Batch/batchManagementApi";
import { TBatch, TCourse } from "../../../../utils/types/globalTypes";
import UpdateBatch from "../UpdateBatch/UpdateBatch";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import { useGetAllCourseQuery } from "../../../../redux/api/features/Course/courseManagementApi";

interface IProps {
  data: TBatch;
  idx: number;
}
const AllBatchBox = ({ data, idx }: IProps) => {
  const {
    batchId,
    batchName,
    underCourse,
    batchStatus,
    start,
    end,
    classNumber,
    projectnumber,
    instructorname,
    instructorimage,
    instructorId,
  } = data;

  const { data: courseData } = useGetAllCourseQuery(undefined);
  const courses = courseData?.data;
  //   console.log("Courses: ", courses);

  const [deleteBatch] = useDeleteBatchMutation();
  const handleDelete = async (id: string) => {
    console.log("Delete: ", id);
    toast.loading("Deleting batch", { id: sonarId });
    const res = await deleteBatch(id).unwrap();
    console.log("res: ", res);
    if (res?.status) {
      toast.success("Batch deleted", { id: sonarId });
    }
  };
  return (
    // <div className="border py-4 px-2 rounded-md relative ">
    //   <h1>
    //     {" "}
    //     <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
    //       Batch id
    //     </span>{" "}
    //     <span className="ml-4">{batchId}</span>
    //   </h1>
    //   <div className="mt-4 flex justify-between">
    //     <div className="">
    //       {underCourse && (
    //         <p>
    //           {" "}
    //           <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
    //             Under Course
    //           </span>{" "}
    //           <span className="ml-2">{underCourse}</span>
    //         </p>
    //       )}
    //     </div>
    //     <div className="">
    //       <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
    //         Course Name
    //       </span>{" "}
    //       <span className="ml-2">
    //         {courses?.find((course: TCourse) => course?.courseId == underCourse)
    //           ?.courseTitle || "Not Found"}
    //       </span>
    //     </div>
    //   </div>
    //   <div className="mt-4">
    //     {batchName && (
    //       <p>
    //         {" "}
    //         <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
    //           Batch Name
    //         </span>{" "}
    //         <span className="ml-2">{batchName}</span>
    //       </p>
    //     )}
    //   </div>
    //   <div className="mt-4 flex justify-between">
    //     <p>
    //       {" "}
    //       <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
    //         start
    //       </span>{" "}
    //       <span className="ml-2"> {start}</span>
    //     </p>
    //     <p>
    //       <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
    //         End
    //       </span>{" "}
    //       <span className="ml-2"> {end}</span>
    //     </p>
    //   </div>
    //   <div className="mt-4 flex justify-between">
    //     <p>
    //       <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
    //         Batch Status
    //       </span>{" "}
    //       <span
    //         className={`ml-2 py-1 px-2 shadow-md text-white rounded-md ${
    //           batchStatus === "onGoing"
    //             ? "bg-purple-500"
    //             : data?.batchStatus === "upComing"
    //             ? "bg-green-500"
    //             : data?.batchStatus === "end"
    //             ? "bg-red-800"
    //             : "bg-gray-400" // Default case (optional)
    //         }`}
    //       >
    //         {batchStatus}
    //       </span>
    //     </p>
    //     <p>
    //       <span className="bg-white py-1 px-2 shadow-md text-black rounded-md">
    //         Class
    //       </span>{" "}
    //       <span className={`ml-2 py-1 px-2 shadow-md text-white rounded-md`}>
    //         {classNumber}
    //       </span>
    //     </p>
    //   </div>

    //   <div className="absolute top-2 right-2 flex gap-x-2">
    //     <div>
    //       <UpdateBatch batchId={batchId} />
    //     </div>

    //     <div onClick={() => handleDelete(batchId)}>
    //       <DeleteComponent />
    //     </div>
    //   </div>
    // </div>

    <tr
      // key={idx}
      className=" border-b border-gray-700 hover:bg-gray-700 transition-all duration-300"
    >
      <td className="py-3 px-4">{idx + 1}</td>
      <td className="py-3 px-4">{batchId}</td>
      <td className="py-3 px-4">{batchName}</td>
      <td className="py-3 px-4">{underCourse}</td>
      <td className="py-3 px-4">
        {
          <span className="ml-2">
            {courses?.find((course: TCourse) => course?.courseId == underCourse)
              ?.courseTitle || "Not Found"}
          </span>
        }
      </td>
      <td className="py-3 px-4">
        {
          <span
            className={`ml-2 py-1 px-2 shadow-md text-white rounded-md ${
              batchStatus === "onGoing"
                ? "bg-purple-500"
                : data?.batchStatus === "upComing"
                ? "bg-green-500"
                : data?.batchStatus === "end"
                ? "bg-red-800"
                : "bg-gray-400" // Default case (optional)
            }`}
          >
            {batchStatus}
          </span>
        }
      </td>
      <td className="py-3 px-4">{classNumber}</td>
      <td className="py-3 px-4">{projectnumber}</td>
      <td className="py-3 px-4">{instructorId}</td>
      <td className="py-3 px-4">{instructorname}</td>
      <td className="py-3 px-4">
        <img
          src={instructorimage}
          className="w-16 h-10 object-cover rounded-md"
        />
      </td>
      <td className="py-3 px-4">{start}</td>
      <td className="py-3 px-4">{end}</td>
      <td className="py-3 px-4">
        <UpdateBatch batchId={batchId} />
      </td>
      <td className="py-3 px-4">
        {
          <div onClick={() => handleDelete(batchId)}>
            <DeleteComponent />
          </div>
        }
      </td>
    </tr>
  );
};

export default AllBatchBox;
