import { TOurPeople } from "../../../../utils/types/globalTypes";

interface IProps {
  people: TOurPeople;
}

const ReviewBox = ({ people }: IProps) => {
  const { name, course, image, message } = people;
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-[320px] md:h-[300px] flex flex-col relative group">
      {/* Review Text */}
      <div className="flex-1 overflow-hidden">
        <p className="text-gray-700 italic text-lg leading-relaxed">
          "{message}"
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>

      {/* Reviewer Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-[#262F51] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
          <span className="text-white font-bold text-lg">
            <img src={image} alt="" className="rounded-full" />
          </span>
        </div>

        {/* Name and Course */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-teal-600 font-medium">{course}</p>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-500 rounded-tr-xl"></div>
    </div>
  );
};

export default ReviewBox;
