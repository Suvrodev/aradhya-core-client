import React, { useState } from "react";
import { useAddOurPeopleMutation } from "../../../redux/api/features/OurPeople/ourPeopleManagementApi";
import { toast } from "sonner";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import OurAllPeople from "./OurAllPeople/OurAllPeople";
import { useTitle } from "../../../Component/hook/useTitle";

const AdminOurPeople = () => {
  useTitle("Admin-Our People");
  const [addOurPeople] = useAddOurPeopleMutation();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    designation: "",
    message: "",
    course: "",
    facebook: "",
    portfolio: "",
    order: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    toast.loading("Adding", { id: sonarId });
    try {
      const res = await addOurPeople(formData).unwrap();
      console.log("Res: ", res);
      if (res?.success) {
        toast.success("Added", { id: sonarId });
      }
    } catch {
      console.log("Something error");
    }
  };

  return (
    <div className="p-6  mx-auto">
      {!showForm ? (
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="relative overflow-hidden bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 text-white font-medium px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <span className="relative z-10 flex items-center">
              Add New Team Member
              <span className="ml-2 text-xl">+</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm bg-opacity-90"
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 text-center">
            Add Team Member
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image URL */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Image URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-rose-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-rose-100 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 bg-rose-50 text-gray-800 placeholder-rose-300 transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-purple-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-200 bg-purple-50 text-gray-800 placeholder-purple-300 transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* Designation */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Designation
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="designation"
                  placeholder="Software Engineer"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 bg-blue-50 text-gray-800 placeholder-blue-300 transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* Course */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Course
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="course"
                  placeholder="Computer Science"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-teal-100 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 bg-teal-50 text-gray-800 placeholder-teal-300 transition-all outline-none"
                />
              </div>
            </div>

            {/* Facebook */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Facebook URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-sky-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="facebook"
                  placeholder="https://facebook.com/username"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-sky-100 focus:border-sky-300 focus:ring-2 focus:ring-sky-200 bg-sky-50 text-gray-800 placeholder-sky-300 transition-all outline-none"
                />
              </div>
            </div>

            {/* Portfolio */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Portfolio URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="portfolio"
                  placeholder="https://portfolio.example.com"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-amber-100 focus:border-amber-300 focus:ring-2 focus:ring-amber-200 bg-amber-50 text-gray-800 placeholder-amber-300 transition-all outline-none"
                />
              </div>
            </div>

            {/* Order */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Display Order
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                </div>
                <input
                  type="tel"
                  name="order"
                  placeholder="0"
                  value={formData.order}
                  onChange={handleChange}
                  className="hide-arrows ha w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 bg-indigo-50 text-gray-800 placeholder-indigo-300 transition-all outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Message
              <span
                className={`ml-2 text-xs font-medium ${
                  formData.message.length > 180
                    ? "text-rose-500"
                    : "text-gray-500"
                }`}
              >
                {200 - formData.message.length} characters remaining
              </span>
            </label>
            <div className="relative">
              <textarea
                name="message"
                placeholder="A short bio or message..."
                maxLength={200}
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-100 focus:border-pink-300 focus:ring-2 focus:ring-pink-200 bg-pink-50 text-gray-800 placeholder-pink-300 transition-all outline-none resize-none"
              />
              <div className="absolute bottom-2 right-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100 text-pink-500 text-xs font-bold">
                  {formData.message.length}/200
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 border-2 border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium px-8 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 group"
            >
              <span className="relative z-10">Save Team Member</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
            </button>
          </div>
        </form>
      )}

      <div>
        <OurAllPeople />
      </div>
    </div>
  );
};

export default AdminOurPeople;
