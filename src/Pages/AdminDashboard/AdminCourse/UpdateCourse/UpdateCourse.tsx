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

const UpdateCourse = () => {
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

  const [refService, setRefService] = useState<string>(
    specificCourse?.refService
  );
  const [refServiceId, setRefServiceId] = useState<string>(
    specificCourse?.refServiceId
  );
  const [selectedService, setSelectedService] = useState<string>(
    serviceNameSelect?.name
  );

  useEffect(() => {
    if (serviceNameSelect) {
      setSelectedService(serviceNameSelect?.name);
      setRefService(serviceNameSelect?._id);
      setRefServiceId(serviceNameSelect?.serviceId);
    }
  }, [CourseData, serviceData, serviceNameSelect]);
  console.log("So service name", selectedService);

  const [courseStatus, setCourseStatus] = useState<string>("onGoing");
  const [courseExists, setCourseExists] = useState<boolean>(true);
  const handleCourseStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCourseStatus(event.target.value);
  };

  const handleCourseExists = (event: ChangeEvent<HTMLSelectElement>) => {
    const res = event.target.value;
    if (res == "true") {
      setCourseExists(true);
    } else {
      setCourseExists(false);
    }
  };

  const handleService = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [serviceId, _id, name] = event.target.value.split(",");

    setRefService(_id);
    setRefServiceId(serviceId);
    setSelectedService(name); // Set selected service name
  };

  // console.log("ref Service:", refService);
  // console.log("Service id:", refServiceId);

  const handleAddCourse = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Add Course");
    const Form = event.target as HTMLFormElement;

    if (!refService) {
      toast.error("Select Service", { id: sonarId });
      return;
    }

    const courseId = Form.courseId.value;
    const courseTitle = Form.courseTitle.value;
    const courseImage = Form.courseImage.value;
    const courseDescription = Form.courseDescription.value;
    const coursePrice = Form.coursePrice.value;
    const courseDiscount = Form.courseDiscount?.value;
    const courseDiscountReason = Form.courseDiscountReason?.value;
    // const courseCoupon = Form.courseCoupon?.value;
    // const courseCouponStatus = Form.courseCouponStatus?.checked;
    const courseYoutubeVideo = Form.courseYoutubeVideo?.value;
    const courseClassNumber = Form.courseClassNumber.value;
    const courseStartDate = Form.courseStartDate.value;

    const courseDuration = Form.courseDuration.value;
    const courseProjectNumber = Form.courseProjectNumber.value;
    const courseReview = Form.courseReview?.value;

    const updateData = {
      refService,
      refServiceId,
      courseId,
      courseTitle,
      courseImage,
      courseDescription,
      coursePrice: Number(coursePrice),
      courseDiscount: Number(courseDiscount),
      courseDiscountReason,
      courseYoutubeVideo,
      courseClassNumber: Number(courseClassNumber),
      courseStartDate,
      courseDuration,
      courseProjectNumber: Number(courseProjectNumber),
      courseReview,
      computerConfiguration,
      courseStatus,
      courseExists,
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
      <div className="w-full max-w-3xl bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Update Course
        </h2>
        <form onSubmit={handleAddCourse}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course id */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Id
              </label>
              <input
                type="text"
                name="courseId"
                defaultValue={specificCourse?.courseId}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                value={
                  selectedService
                    ? `${refServiceId},${refService},${selectedService}`
                    : ""
                }
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="" disabled>
                  Select one
                </option>
                {services?.map((data: TService, idx: number) => (
                  <option
                    value={`${data?.serviceId},${data?._id},${data?.name}`}
                    key={idx}
                  >
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
                type="number"
                name="courseClassNumber"
                defaultValue={specificCourse?.courseClassNumber}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter class number"
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Start Date
              </label>
              <input
                type="date"
                name="courseStartDate"
                defaultValue={specificCourse?.courseStartDate}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                type="number"
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

            {/* Course Status */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Status
              </label>
              <select
                name="courseStatus"
                onChange={handleCourseStatus}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="onGoing" className="bg-gray-800">
                  On Going
                </option>
                <option value="upComming" className="bg-gray-800">
                  Upcoming
                </option>
              </select>
            </div>

            {/* Course Exists */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Exists
              </label>
              <select
                name="courseExists"
                onChange={handleCourseExists}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="true" className="bg-gray-800">
                  Yes
                </option>
                <option value="false" className="bg-gray-800">
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
            <div className="md:col-span-2">
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
            </div>

            {/* Computer Configuration */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-2 text-gray-300">
                Computer Configuration
              </label>
              <TextEditor
                content={computerConfiguration}
                setContent={setComputerConfiguration}
              />
            </div>

            {/* Submit Button */}
            <button className="md:col-span-2 mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105">
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
