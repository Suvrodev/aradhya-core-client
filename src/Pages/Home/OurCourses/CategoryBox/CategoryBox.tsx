import { TCategory } from "../../../../utils/types/globalTypes";
import { BookOpen, Code, Gamepad2, Paintbrush } from "lucide-react";
interface Iprops {
  category: TCategory;
}

// Function to map categories to icons
const getCategoryIcon = (name: string) => {
  switch (name) {
    case "Graphics Design":
      return <Paintbrush size={40} className="text-blue-500" />;
    case "Game Developing":
      return <Gamepad2 size={40} className="text-green-500" />;
    case "Programming":
      return <Code size={40} className="text-purple-500" />;
    case "ICT 11-12":
      return <BookOpen size={40} className="text-orange-500" />;
    default:
      return <BookOpen size={40} className="text-gray-500" />;
  }
};

const CategoryBox = ({ category }: Iprops) => {
  const { name } = category;
  return (
    <div className="group bg-gradient-to-b from-gray-100 to-white shadow-md hover:shadow-lg border border-gray-200 rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:scale-105">
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Dynamic Icon */}
        <div className="p-4 bg-white rounded-full shadow-md">
          {getCategoryIcon(name)}
        </div>

        {/* Category Name */}
        <h1 className="text-black font-semibold text-xl">{name}</h1>
      </div>
    </div>
  );
};

export default CategoryBox;
