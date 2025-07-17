import freeSeminerImage2 from "../../../../../assets/freeSeminer/free-seminer2.webp";

const SeminerSecondPortion = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 py-16 px-6 lg:px-20 rounded-3xl shadow-sm border border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-[#262F51] rounded-xl opacity-75 group-hover:opacity-100 blur-md transition-all duration-300"></div>
          <img
            src={freeSeminerImage2}
            alt="Project-Based Classes"
            className="relative rounded-xl shadow-lg transform group-hover:scale-[1.01] transition-all duration-500 border-4 border-white"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-teal-500 to-[#262F51] bg-clip-text text-transparent">
              Project-Based Learning
            </span>{" "}
            is Our Specialty
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            We transform conceptual knowledge into market-ready skills through
            our intensive project-based curriculum.
          </p>

          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 mt-1 mr-3 text-teal-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-gray-700">
                Hands-on training tailored to current job market demands
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 mt-1 mr-3 text-teal-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-gray-700">
                Progress tracking through structured project milestones
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 mt-1 mr-3 text-teal-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-gray-700">
                Portfolio development to showcase your skills to employers
              </span>
            </li>
          </ul>

          <button className="mt-6 bg-gradient-to-r from-teal-500 to-[#262F51] text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-1">
            Explore Our Curriculum
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeminerSecondPortion;
