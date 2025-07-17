import { useNavigate } from "react-router";
import corporateImage from "../../../../assets/homeAbout/homeAbout.webp";

const HomeAbout = () => {
  const navigate = useNavigate();

  const handleGoAbout = () => {
    navigate("/about-us");
  };

  return (
    <div className="bg-gradient-to-br from-[#262F51] to-teal-600 rounded-2xl shadow-lg overflow-hidden mx-4 md:mx-auto my-10 md:my-16 max-w-7xl">
      <div className="flex flex-col md:flex-row">
        {/* Text Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            About <span className="text-teal-300">Aradhya Core</span>
          </h1>

          <p className="text-white/90 text-lg leading-relaxed mb-6">
            At Aradhya Core, our primary aim is to empower the community through
            exceptional learning standards. We are committed to transforming
            tech education with practical, industry-relevant training.
            <span
              className="text-teal-200 font-semibold cursor-pointer hover:underline ml-1"
              onClick={handleGoAbout}
            >
              Read more...
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGoAbout}
              className="bg-white text-[#262F51] hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              বিস্তারিত দেখুন
            </button>
            <button
              onClick={handleGoAbout}
              className="border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              Our Mission
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-[#262F51]/20 "></div>
          <img
            src={corporateImage}
            alt="Weaverr IT Team"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-20">
            <h3 className="text-white text-xl font-bold">
              Our Corporate Training
            </h3>
            <p className="text-white/80 text-sm">
              Hands-on learning with industry experts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
