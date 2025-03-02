import { FormEvent, useState } from "react";
import { useGetAllServiceQuery } from "../../../../redux/api/features/Service/serviceManagementApi";
import { TService } from "../../../../utils/types/globalTypes";
import TextEditor from "../../AdminBlog/TextEditor/TextEditor";

const AddCourse = () => {
  const { data } = useGetAllServiceQuery(undefined);
  const services = data?.data;
  // console.log("Services: ", services);

  const [computerConfiguration, setComputerConfiguration] = useState<string>(
    " <p>Computer Configuration</p>"
  );
  const [refService, setRefService] = useState<string>("");
  const [refServiceId, setRefServiceId] = useState<string>("");

  const handleService = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [serviceId, _id] = event.target.value.split(",");

    setRefService(_id);
    setRefServiceId(serviceId);
  };

  console.log("ref Service:", refService);
  console.log("Service id:", refServiceId);

  const handleAddCourse = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Add Course");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="w-full max-w-3xl bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Add Course
        </h2>
        <form onSubmit={handleAddCourse}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Title */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Id
              </label>
              <input
                type="text"
                name="courseTitle"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter course title"
                required
              />
            </div>
            {/* Course Title */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Service id
              </label>

              <select
                onChange={handleService}
                name=""
                id=""
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="" disabled>
                  Select one
                </option>
                {services?.map((data: TService, idx: number) => (
                  <option value={`${data?.serviceId},${data?._id}`} key={idx}>
                    {" "}
                    {data?.name}{" "}
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter number of projects"
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
              />
            </div>

            {/* Course Status */}
            <div>
              <label className="block font-medium mb-2 text-gray-300">
                Course Status
              </label>
              <select
                name="courseStatus"
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
                type="url"
                name="courseDescription"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
