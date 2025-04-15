import { useDispatch } from "react-redux";
import {
  Code,
  Gamepad2,
  Paintbrush,
  Network,
  Layers,
  Film,
  MonitorPlay,
  School,
} from "lucide-react";
import { selectCategory } from "../../../../../redux/api/features/Service/selectServiceSlice";
import { useAppSelector } from "../../../../../redux/hook";
import { TService } from "../../../../../utils/types/globalTypes";
interface Iprops {
  service: TService;
}

// Function to map categories to icons
const getServiceIcon = (name: string) => {
  switch (name) {
    case "All Course":
      return <Layers size={20} className="text-gray-600" />;
    case "Graphics And Art":
      return <Paintbrush size={20} className="text-blue-500" />;
    case "Game Development and 3D Animation":
      return <Gamepad2 size={20} className="text-green-500" />;
    case "Film And Media":
      return <Film size={20} className="text-yellow-500" />;
    case "Networking":
      return <Network size={20} className="text-red-500" />;
    case "Computer Programming":
      return <Code size={20} className="text-purple-500" />;
    case "Education":
      return <School size={20} className="text-orange-500" />;
    case "3D Animation": // If you have this as a separate category
      return <MonitorPlay size={20} className="text-indigo-500" />;
    default:
      return <Layers size={20} className="text-gray-500" />;
  }
};

const ServiceBox = ({ service }: Iprops) => {
  const { serviceId: selectService } = useAppSelector(
    (state) => state.selectService
  );
  const dispatch = useDispatch();

  const { name, serviceId } = service;

  const handleCategory = (serviceId: string) => {
    // console.log("Category id: ", serviceId);
    dispatch(selectCategory(serviceId));
  };

  // console.log("Select service:------------ ", selectService);
  // console.log("Service id:----------------- ", serviceId);
  return (
    // <div
    //   className={`px-4 group shadow-md hover:shadow-lg rounded-2xl py-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
    //     selectService == serviceId
    //       ? "bg-gradient-to-b from-[#669fb3] to-sky-500"
    //       : "bg-gradient-to-b from-gray-100 to-white border border-gray-200"
    //   }`}
    //   onClick={() => handleCategory(serviceId)}
    // >
    //   <div className="flex flex-col items-center text-center space-y-3 ">
    //     {/* Dynamic Icon */}
    //     <div className="p-0 md:p-4 bg-white rounded-full shadow-md">
    //       {getServiceIcon(name)}
    //     </div>

    //     {/* Service Name */}
    //     <h1 className="text-black font-semibold text-[16px] md:text-[16px] line-clamp-2">
    //       {name}
    //     </h1>
    //   </div>
    // </div>
    <div
      className={`px-4 h-[100px] md:h-[115px] group shadow-md hover:shadow-lg rounded-2xl py-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
        selectService == serviceId
          ? "bg-gradient-to-b from-[#669fb3] to-sky-500"
          : "bg-gradient-to-b from-gray-100 to-white border border-gray-200"
      }`}
      onClick={() => handleCategory(serviceId)}
    >
      <div className="flex flex-col items-center text-center space-y-2 md:space-y-2 h-full">
        {/* Dynamic Icon */}
        <div className="p-2 md:p-4 rounded-full bg-white shadow-md">
          {getServiceIcon(name)}
        </div>

        {/* Service Name with fixed height container */}
        <div className=" flex items-center justify-center w-full px-2">
          <h1 className="text-black font-semibold text-[16px] leading-tight line-clamp-2">
            {name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ServiceBox;
