import { useParams } from "react-router";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  useGetSpecificCourseQuery,
  useUpdateCourseMutation,
} from "../../../../redux/api/features/Course/courseManagementApi";
import { useGetAllServiceQuery } from "../../../../redux/api/features/Service/serviceManagementApi";
import TextEditor from "../../AdminBlog/TextEditor/TextEditor";
import { TCourse, TService } from "../../../../utils/types/globalTypes";
import LoadingPage from "../../../../Component/LoadingPage/LoadingPage";
import { useTitle } from "../../../../Component/hook/useTitle";

const UpdateCourse = () => {
  useTitle("Admin-Update Course");
  const { id } = useParams();
  // console.log("Course id: ", id);
  const { data: CourseData, isLoading } = useGetSpecificCourseQuery(id);
  const { data: serviceData } = useGetAllServiceQuery(undefined);
  const [updateCourse] = useUpdateCourseMutation();
  const services = serviceData?.data;
  const specificCourse: TCourse = CourseData?.data;
  // console.log("Specific Course: ", specificCourse);
  // console.log("All Services: ", services);

  /**
   * For Autometically Selection Service id
   */
  const serviceNameSelect: TService = services?.find((data: TService) => {
    const serviceData = data?.serviceId == specificCourse?.refServiceId;
    if (serviceData) {
      return serviceData;
    } else {
      return;
    }
  });
  // console.log("Filter Service: ", serviceNameSelect);

  const [computerConfiguration, setComputerConfiguration] = useState<string>(
    specificCourse?.computerConfiguration
  );
  const [description, setDescription] = useState(
    specificCourse?.courseDescription
  );

  const [refServiceId, setRefServiceId] = useState<string>(
    specificCourse?.refServiceId
  );

  const [courseExists, setCourseExists] = useState<string>(
    specificCourse?.courseExists
  );

  useEffect(() => {
    if (serviceNameSelect) {
      setRefServiceId(serviceNameSelect?.serviceId);
      setComputerConfiguration(specificCourse?.computerConfiguration);
      setCourseExists(specificCourse.courseExists);
      setDescription(specificCourse.courseDescription);
    }
  }, [CourseData, serviceData, serviceNameSelect, specificCourse]);

  const handleCourseExists = (event: ChangeEvent<HTMLSelectElement>) => {
    const res = event.target.value;
    setCourseExists(res);
  };

  const handleService = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const res = event.target.value;
    setRefServiceId(res);
  };
  console.log(" refServiceId:", refServiceId);

  const handleAddCourse = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Add Course");
    const Form = event.target as HTMLFormElement;

    if (!refServiceId) {
      toast.error("Select Service", { id: sonarId });
      return;
    }

    const courseId = Form.courseId.value;
    const courseTitle = Form.courseTitle.value;
    const courseImage = Form.courseImage.value;
    const coursePrice = Form.coursePrice.value;
    const courseDiscount = Form.courseDiscount?.value;
    const courseDiscountReason = Form.courseDiscountReason?.value;
    const courseYoutubeVideo = Form.courseYoutubeVideo?.value;
    const courseClassNumber = Form.courseClassNumber.value;

    const courseDuration = Form.courseDuration.value;
    const courseProjectNumber = Form.courseProjectNumber.value;
    const courseReview = Form.courseReview?.value;

    const kikipaschen = Form.kikipaschen?.value;
    const courseCurriculum = Form.courseCurriculum?.value;
    const jobposition = Form.jobposition?.value;
    const projects = Form.projects?.value;

    // Processing needed software into an array of objects
    const neededsoftware = Form.neededsoftware?.value;
    const neededSoftwareArray = neededsoftware
      .split("#")
      .map((item: string) => {
        const [image, title] = item.split(",").map((el) => el.trim());
        return { image, title };
      });

    const updateData = {
      refServiceId,
      courseId,
      courseTitle,
      courseImage,
      courseDescription: description,
      coursePrice: Number(coursePrice),
      courseDiscount: Number(courseDiscount),
      courseDiscountReason,
      courseYoutubeVideo,
      courseClassNumber: courseClassNumber,
      courseDuration,
      courseProjectNumber: courseProjectNumber,
      courseReview,
      computerConfiguration,
      courseExists,
      kikipaschen: kikipaschen.split("#").map((item: string) => item.trim()),
      courseCurriculum: courseCurriculum
        .split("#")
        .map((item: string) => item.trim()),
      jobposition: jobposition.split("#").map((item: string) => item.trim()),
      projects: projects.split("#").map((item: string) => item.trim()),
      neededSoftware: neededSoftwareArray,
    };
    console.log("Update Data: ", updateData);
    toast.loading("Updating Course", { id: sonarId });
    const res = await updateCourse({ id, updateData }).unwrap();
    console.log("Res: ", res);
    if (res?.status) {
      toast.success(" Course Updated", { id: sonarId });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Update Course
        </h2>

        <img
          src={specificCourse?.courseImage}
          className="w-full md:w-[450px] mx-auto h-[300px] rounded-md"
          alt=""
        />
        <form onSubmit={handleAddCourse} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Course id */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Id
              </label>
              <input
                type="text"
                name="courseId"
                defaultValue={specificCourse?.courseId}
                className="w-full p-3 bg-blue-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter course id"
                required
                disabled
              />
            </div>
            {/* Service id */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Service id
              </label>

              {/* Under Servuice */}
              <select
                onChange={handleService}
                value={refServiceId}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="" disabled>
                  Select one
                </option>
                {services?.map((data: TService, idx: number) => (
                  <option value={data?.serviceId} key={idx}>
                    {data?.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Course Title */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Title
              </label>
              <input
                type="text"
                name="courseTitle"
                defaultValue={specificCourse?.courseTitle}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter course title"
                required
              />
            </div>

            {/* Course Image URL */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Image URL
              </label>
              <input
                type="text"
                name="courseImage"
                defaultValue={specificCourse?.courseImage}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter image URL"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Price
              </label>
              <input
                type="number"
                name="coursePrice"
                defaultValue={specificCourse?.coursePrice}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter price"
                required
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Discount (%)
              </label>
              <input
                type="number"
                name="courseDiscount"
                defaultValue={specificCourse?.courseDiscount}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter discount"
                required
              />
            </div>

            {/* Discount Reason */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Discount Reason
              </label>
              <input
                type="text"
                name="courseDiscountReason"
                defaultValue={specificCourse?.courseDiscountReason}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter discount reason"
                required
              />
            </div>

            {/* Class Number */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Class Number
              </label>
              <input
                type="text"
                name="courseClassNumber"
                defaultValue={specificCourse?.courseClassNumber}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter class number"
                required
              />
            </div>

            {/* Course Duration */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Duration
              </label>
              <input
                type="text"
                name="courseDuration"
                defaultValue={specificCourse?.courseDuration}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter duration (e.g., 3 months)"
                required
              />
            </div>

            {/* Project Number */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Project Number
              </label>
              <input
                type="text"
                name="courseProjectNumber"
                defaultValue={specificCourse?.courseProjectNumber}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter number of projects"
                required
              />
            </div>

            {/* Course Review */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Review
              </label>
              <input
                type="text"
                name="courseReview"
                defaultValue={specificCourse?.courseReview}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter course review"
                required
              />
            </div>

            {/* Course Exists */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Exists
              </label>
              <select
                name="courseExists"
                value={courseExists}
                onChange={handleCourseExists}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="yes" className="bg-gray-800">
                  Yes
                </option>
                <option value="no" className="bg-gray-800">
                  No
                </option>
              </select>
            </div>

            {/* youtube Link */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-2 text-gray-300">
                Youtube Video Link
              </label>
              <input
                type="text"
                name="courseYoutubeVideo"
                defaultValue={specificCourse?.courseYoutubeVideo}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter course description"
              ></input>
            </div>
            {/* Description */}
            {/* <div className="md:col-span-4">
              <label className="block font-medium mb-2 text-gray-300">
                Description
              </label>
              <textarea
                name="courseDescription"
                defaultValue={specificCourse?.courseDescription}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                rows={4}
                placeholder="Enter course description"
                required
              ></textarea>
            </div> */}

            {/* Description */}
            <div className="md:col-span-4">
              <label className="block font-medium mb-2 text-gray-300">
                Description
              </label>
              {/* <textarea
                name="courseDescription"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                rows={4}
                placeholder="Enter course description (max 500 characters)"
                maxLength={550}
                required
                defaultValue={specificCourse?.courseDescription}
                onChange={handleDescriptionChange}
              />
              <div className={`text-right text-sm mt-1  "text-gray-400"`}>
                Characters remaining: {remainingChars}/550
              </div> */}
              <TextEditor content={description} setContent={setDescription} />
            </div>

            {/* Course Passes */}
            <div className="md:col-span-4">
              <label className="block font-medium mb-2 text-green-500">
                কোর্সে কি কি পাচ্ছে
              </label>
              <textarea
                name="kikipaschen"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="কোর্সে কি কি পাচ্ছেন, separated by #"
                defaultValue={specificCourse?.kikipaschen?.join("#")}
              />
            </div>

            {/* Course Curriculum */}
            <div className="md:col-span-4">
              <label className="block font-medium mb-2 text-green-500">
                Course Curriculam
              </label>
              <textarea
                name="courseCurriculum"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Course Curriculum, separated by #"
                defaultValue={specificCourse?.courseCurriculum?.join("#")}
              />
            </div>

            {/* Open Job Position */}
            <div className="md:col-span-4">
              <label className="block font-medium mb-2 text-green-500">
                Job Position
              </label>
              <textarea
                name="jobposition"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Job Position, separated by #"
                defaultValue={specificCourse?.jobposition?.join("#")}
              />
            </div>

            {/*Project */}
            <div className="md:col-span-4">
              <label className="block font-medium mb-2 text-green-500">
                Projects
              </label>
              <textarea
                name="projects"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Job Position, separated by #"
                defaultValue={specificCourse?.projects?.join("#")}
              />
            </div>

            {/*Software You will learn */}
            <div className="md:col-span-4">
              <label className="block font-medium mb-2 text-green-500">
                Needed Software
              </label>
              <textarea
                name="neededsoftware"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Job Position, separated by #"
                defaultValue={specificCourse?.neededSoftware
                  ?.map((item) => `${item.image},${item.title}`)
                  .join("#")}
              />
            </div>

            {/* Computer Configuration */}
            <div className="md:col-span-4">
              <label className="block font-medium mb-2 text-gray-300">
                Computer Configuration
              </label>
              <TextEditor
                content={computerConfiguration}
                setContent={setComputerConfiguration}
              />
            </div>

            {/* Submit Button */}
            <button className="md:col-span-4 mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105">
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
