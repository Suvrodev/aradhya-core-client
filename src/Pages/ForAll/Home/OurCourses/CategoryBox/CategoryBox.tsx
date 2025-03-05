import { useDispatch } from "react-redux";
import {
  BookOpen,
  Code,
  Gamepad2,
  Paintbrush,
  Network,
  Layers,
} from "lucide-react";
import { TCategory } from "../../../../../utils/types/globalTypes";
import { selectCategory } from "../../../../../redux/features/selectCategorySlice";
interface Iprops {
  category: TCategory;
}

// Function to map categories to icons
const getCategoryIcon = (name: string) => {
  switch (name) {
    case "Graphics And Art":
      return <Paintbrush size={40} className="text-blue-500" />;
    case "Game Developing":
      return <Gamepad2 size={40} className="text-green-500" />;
    case "Computer Programming":
      return <Code size={40} className="text-purple-500" />;
    case "Education":
      return <BookOpen size={40} className="text-orange-500" />;
    case "Netwroking":
      return <Network size={40} className="text-red-500" />;
    default:
      return <Layers size={40} className="text-gray-500" />;
  }
};

const CategoryBox = ({ category }: Iprops) => {
  const dispatch = useDispatch();

  const { name, id } = category;

  const handleCategory = (id: string) => {
    console.log("Category id: ", id);
    dispatch(selectCategory(id));
  };
  return (
    <div
      className="group bg-gradient-to-b from-gray-100 to-white shadow-md hover:shadow-lg border border-gray-200 rounded-2xl py-2 transition-all duration-300 cursor-pointer hover:scale-105"
      onClick={() => handleCategory(id)}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Dynamic Icon */}
        <div className="p-0 md:p-4 bg-white rounded-full shadow-md">
          {getCategoryIcon(name)}
        </div>

        {/* Category Name */}
        <h1 className="text-black font-semibold text-[16px] md:text-xl ">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default CategoryBox;
