import freeSeminerImage from "../../../../assets/freeSeminer/free-seminer.webp";
import SeminerSecondPortion from "./SeminerSecondPortion/SeminerSecondPortion";

const FreeSeminer = () => {
  return (
    <div className="flex flex-col gap-[50px]">
      <div className="bg-gradient-to-br from-teal-500 to-[#262F51] py-16 px-6 md:px-12 lg:px-20 rounded-3xl shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Free Seminars
            </h2>
            <p className="text-lg text-white/80 mb-6">
              Looking for guidance in selecting the right course? Attend our
              free seminars and consult with our experts, who will help you
              choose a course aligned with your interests and explore potential
              career opportunities.
            </p>
            <button className="bg-white text-teal-600 hover:bg-teal-100 font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg">
              Free Seminar Schedule
            </button>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={freeSeminerImage}
              alt="Free Seminar"
              className="rounded-3xl shadow-lg w-full h-auto object-cover border-4 border-white/20"
            />
          </div>
        </div>
      </div>

      <div>
        <SeminerSecondPortion />
      </div>
    </div>
  );
};

export default FreeSeminer;
