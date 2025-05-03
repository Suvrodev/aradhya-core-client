import "./ServiceBoxSKL.css";
const ServiceBoxSKL = () => {
  return (
    <div
      className={`w-full px-4 h-[100px] md:h-[115px] group shadow-md hover:shadow-lg rounded-2xl py-2 bg-gradient-to-b from-gray-100 to-white border border-gray-200 `}
    >
      <div className="flex flex-col items-center text-center space-y-2 md:space-y-4 h-full">
        {/* Dynamic Icon */}
        <div className="p-2 md:p-4 rounded-full skelitonAC shadow-md "></div>

        {/* Service Name with fixed height container */}

        <p className=" skelitonAC h-[30px] w-10/12 bg-green-400 mt-[100px]"></p>
      </div>
    </div>
  );
};

export default ServiceBoxSKL;
