import "./BannerContent.css";
import { TBanner } from "../../../../../utils/types/globalTypes";

interface IProps {
  banner: TBanner;
}
const BannerContent = ({ banner }: IProps) => {
  console.log("Banner: ", banner);
  const { title, motto, image } = banner;
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-0 bg-white  p-[9px] md:p-6 rounded-lg shadow-lg h-full innerShadw">
      <div className="w-full md:w-1/2 text-center md:text-left  h-full  ">
        <h1 className="text-3xl font-bold text-black">
          গ্রাফিক্স ডিজাইন <span className="text-red-500">লাইভ</span> ●
        </h1>
        <p className="mt-10 text-black font-bold">
          স্কিল শেখার মাধ্যমে বদলে ফেলুন নিজের ভবিষ্যৎ
        </p>
        <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded flex items-center">
          শেখা শুরু করুন →
        </button>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:mt-0 h-full ">
        <img
          src="https://i.ibb.co.com/BhdXd41/Graphics-Design.jpg"
          alt="Graphics Design"
          className="w-full md:w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default BannerContent;
