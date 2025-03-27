// import "./BannerContent.css";
// import { TBanner } from "../../../../../utils/types/globalTypes";
// import { Link } from "react-router";

// interface IProps {
//   banner: TBanner;
// }
// const BannerContent = ({ banner }: IProps) => {
//   // console.log("Banner: ", banner);
//   // const { title, motto, image } = banner;
//   return (
//     <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-0 bg-white  p-[9px] md:p-6 rounded-lg shadow-lg h-full innerShadw">
//       <div className="w-full md:w-1/2 text-center md:text-left  h-full  ">
//         <h1 className="text-3xl font-bold text-black">{banner?.motto}</h1>
//         <h1 className="text-black">
//           {" "}
//           আপনার স্বপ্ন সিঁড়ির প্রথম ধাপ শুরু হোক দক্ষতার আরাধ্য কোর থেকেই
//         </h1>
//         <p className="mt-10 text-black font-bold">
//           স্কিল শেখার মাধ্যমে বদলে ফেলুন নিজের ভবিষ্যৎ
//         </p>
//         <Link to={"/all-courses"}>
//           <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded flex items-center">
//             {" "}
//             শেখা শুরু করুন →
//           </button>
//         </Link>
//       </div>
//       <div className="w-full md:w-1/2 flex justify-center md:mt-0 h-full ">
//         <img
//           src={banner?.image}
//           alt="Graphics Design"
//           className="w-full md:w-full rounded-lg shadow-lg"
//         />
//       </div>
//     </div>
//   );
// };

// export default BannerContent;

// import { Link } from "react-router";
// import { TBanner } from "../../../../../utils/types/globalTypes";
// import { motion } from "framer-motion";

// interface IProps {
//   banner: TBanner;
// }

// const BannerContent = ({ banner }: IProps) => {
//   return (
//     <div className="flex flex-col-reverse md:flex-row items-center gap-4 md:gap-0 bg-gradient-to-br from-white to-gray-50 p-4 md:p-8 shadow-xl h-full overflow-hidden relative">
//       {/* Decorative elements */}
//       <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-400/10 rounded-full filter blur-xl"></div>
//       <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/10 rounded-full filter blur-xl"></div>

//       {/* Content section */}
//       <div className="w-full md:w-1/2 text-center md:text-left h-full relative z-10 space-y-3 md:space-y-4 px-2 md:px-0">
//         <motion.h1
//           className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-[#262F51]"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {banner?.motto}
//         </motion.h1>

//         <motion.h2
//           className="text-base sm:text-lg md:text-xl text-gray-700 font-medium"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//         >
//           আপনার স্বপ্ন সিঁড়ির প্রথম ধাপ শুরু হোক দক্ষতার আরাধ্য কোর থেকেই
//         </motion.h2>

//         <motion.p
//           className="mt-3 md:mt-6 text-base md:text-lg font-semibold text-gray-800"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           স্কিল শেখার মাধ্যমে বদলে ফেলুন নিজের ভবিষ্যৎ
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mt-4 md:mt-6"
//         >
//           <Link to="/all-courses">
//             <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-2 px-6 md:py-3 md:px-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-2 text-sm md:text-base">
//               <span>শেখা শুরু করুন</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 md:h-5 md:w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </Link>
//         </motion.div>
//       </div>

//       {/* Responsive image section */}
//       <div className="w-full md:w-1/2 flex justify-center h-full">
//         <img
//           src={banner?.image}
//           alt="Graphics Design"
//           className="w-full max-w-[300px] md:max-w-none md:w-full h-auto object-contain"
//         />
//       </div>
//     </div>
//   );
// };

// export default BannerContent;

import { TBanner } from "../../../../../utils/types/globalTypes";
import { Link } from "react-router";
import { motion } from "framer-motion";

interface IProps {
  banner: TBanner;
}

const BannerContent = ({ banner }: IProps) => {
  return (
    <div className="relative flex flex-col-reverse md:flex-row items-center gap-2 md:gap-6 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] p-[12px] md:p-8 rounded-lg shadow-xl h-full text-white overflow-hidden">
      {/* <div className="relative flex flex-col-reverse md:flex-row items-center gap-6 md:gap-6 bg-white innerShadw p-[12px] md:p-8 rounded-lg shadow-xl h-full text-white overflow-hidden"> */}
      {/* --- Background Glow Effects --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-teal-400/10 rounded-full filter blur-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-teal-300/10 rounded-full filter blur-2xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
      </div>

      {/* --- Text Content Section --- */}
      <div className="mt-10 md:mt-10 w-full md:w-1/2 text-center md:text-left h-full relative z-10">
        <motion.h1
          className="text-[16px] md:text-3xl  font-bold tracking-wide md:leading-[30px] flex justify-center md:justify-start items-center gap-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {banner?.title} <span className="text-red-600">লাইভে</span>{" "}
          {/* <p className="size-6 rounded-full bg-red-500"></p> */}
          <div className="bg-green-500 flex items-end relative">
            <p className="loading loading-dots loading-sm md:loading-lg bg-red-600 absolute -bottom-[16px] md:-bottom-[30px]"></p>
          </div>
        </motion.h1>

        <motion.h1
          className="text-[10px] md:text-lg  font-bold tracking-wide mt-4 md:mt-10 md:leading-[30px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {banner?.motto}
        </motion.h1>

        <motion.p
          className="mt-4 md:mt-6 text-[10px] md:text-lg font-semibold text-teal-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          আপনার স্বপ্ন সিঁড়ির প্রথম ধাপ শুরু হোক দক্ষতার আরাধ্য কোর থেকেই
        </motion.p>

        <Link to={"/all-courses"}>
          <motion.button
            className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg text-sm md:text-lg flex items-center shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            বিস্তারিত দেখুন →
          </motion.button>
        </Link>
      </div>

      {/* --- Image Section (Updated for Mobile) --- */}
      <div className="w-full md:w-1/2 flex justify-center md:mt-0 h-full ">
        <img
          src={banner?.image}
          alt="Graphics Design"
          className="w-[80%] md:w-full max-h-[220px] md:max-h-none md:rounded-lg shadow-lg object-contain md:object-cover"
        />
      </div>
    </div>
  );
};

export default BannerContent;
