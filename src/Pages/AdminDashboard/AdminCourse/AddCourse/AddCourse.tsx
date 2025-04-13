import { ChangeEvent, FormEvent, useState } from "react";
import { useGetAllServiceQuery } from "../../../../redux/api/features/Service/serviceManagementApi";
import { TService } from "../../../../utils/types/globalTypes";
import TextEditor from "../../AdminBlog/TextEditor/TextEditor";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import { useAddCourseMutation } from "../../../../redux/api/features/Course/courseManagementApi";
import { useTitle } from "../../../../Component/hook/useTitle";

const AddCourse = () => {
  useTitle("Admin-Add Course");
  const [addCourse] = useAddCourseMutation();
  const { data } = useGetAllServiceQuery(undefined);
  const services = data?.data;
  // console.log("Services: ", services);

  const [computerConfiguration, setComputerConfiguration] = useState<string>(
    " <p>Computer Configuration</p>"
  );
  const [refServiceId, setRefServiceId] = useState<string>("");
  const [courseExists, setCourseExists] = useState<string>("yes");

  const handleCourseExists = (event: ChangeEvent<HTMLSelectElement>) => {
    const res = event.target.value;
    setCourseExists(res);
  };

  const handleService = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const res = event.target.value;
    setRefServiceId(res);
  };

  console.log("ref Service id:", refServiceId);

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
    const courseDescription = Form.courseDescription.value;
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

    const formData = {
      refServiceId,
      courseId,
      courseTitle,
      courseImage,
      courseDescription,
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
    console.log("Form Data: ", formData);
    toast.loading("Adding Course", { id: sonarId });
    const res = await addCourse(formData).unwrap();
    console.log("Res: ", res);
    if (res?.success) {
      toast.success("Added Course", { id: sonarId });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Add Course
        </h2>
        <form onSubmit={handleAddCourse}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Course id */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Id
              </label>
              <input
                type="text"
                name="courseId"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter course id"
                required
                defaultValue={"c-1"}
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
                  <option value={`${data?.serviceId}`} key={idx}>
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter course title"
                required
                defaultValue="check Title"
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter image URL"
                required
                defaultValue="https://i.ibb.co.com/qFLh8jRD/python.jpg"
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter price"
                required
                defaultValue={5000}
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter discount"
                required
                defaultValue={50}
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter discount reason"
                required
                defaultValue={"Eid Offer"}
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter class number"
                required
                defaultValue={"30+"}
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter duration (e.g., 3 months)"
                required
                defaultValue={"3 Month+"}
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter number of projects"
                required
                defaultValue={"30+"}
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter course review"
                required
                defaultValue={5}
              />
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter course description"
                defaultValue={"youtube Link"}
              ></input>
            </div>
            {/* Description */}
            <div className="md:col-span-4">
              <label className="block font-medium mb-2 text-gray-300">
                Description
              </label>
              <textarea
                name="courseDescription"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                rows={4}
                placeholder="Enter course description"
                required
                defaultValue={"Description"}
              ></textarea>
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
                defaultValue="১৮ সপ্তাহের স্টাডিপ্ল্যান#ক্যানভার উপর ২ টি ক্লাস#AI মিডজার্নির উপর ২ টি ক্লাস"
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
                defaultValue="Raster To Vector#Invoice Template Design#Letterhead Design#Brochure Layout"
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
                defaultValue="Fiver#Upwork"
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
                defaultValue="https://i.ibb.co.com/qFLh8jRD/python.jpg#https://i.ibb.co.com/gLNfMXc0/graphics.jpg"
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
                defaultValue="https://i.ibb.co.com/qFLh8jRD/python.jpg,Photoshop#https://i.ibb.co.com/qFLh8jRD/python.jpg,Illustrator"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
