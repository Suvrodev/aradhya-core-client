// import { motion } from "framer-motion";
// import { FaHandHoldingHeart } from "react-icons/fa";

// const FreePalestine = () => {
//   return (
//     <div className="relative bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white w-full py-3 overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute -top-10 -left-10 w-20 h-20 bg-teal-400/10 rounded-full filter blur-md"
//           animate={{ x: [0, 10, 0], y: [0, 5, 0] }}
//           transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
//         ></motion.div>
//         <motion.div
//           className="absolute -bottom-10 -right-10 w-24 h-24 bg-teal-300/10 rounded-full filter blur-md"
//           animate={{ x: [0, -5, 0], y: [0, -3, 0] }}
//           transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
//         ></motion.div>
//       </div>

//       {/* Glowing border bottom */}
//       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-400/70 to-transparent"></div>

//       <div className="max-w-[82rem] mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8">
//           {/* Palestine Flag */}
//           <motion.div
//             className="flex items-center"
//             whileHover={{ scale: 1.05 }}
//           >
//             <img
//               src="https://i.ibb.co/4RFJf0dn/PFlag.png"
//               alt="Palestine Flag"
//               className="h-8 md:h-10 mr-2 rounded-sm"
//             />
//             <span className="text-lg md:text-xl font-bold tracking-wider text-teal-300">
//               FREE PALESTINE
//             </span>
//           </motion.div>

//           {/* Donation Message */}
//           <motion.div
//             className="flex items-center bg-gradient-to-r from-teal-500/20 to-teal-600/20 px-4 py-2 rounded-full border border-teal-400/30 shadow-lg"
//             initial={{ scale: 0.95 }}
//             animate={{ scale: 1 }}
//             transition={{
//               repeat: Infinity,
//               repeatType: "reverse",
//               duration: 2,
//             }}
//           >
//             <FaHandHoldingHeart className="text-teal-300 mr-2" />
//             <span className="text-xs md:text-sm font-medium">
//               10% টাকা আমাদের ভাই দের সহায়তাইয় যাবে
//             </span>
//           </motion.div>

//           {/* Solidarity Message */}
//           <motion.div
//             className="hidden md:flex items-center"
//             whileHover={{ scale: 1.02 }}
//           >
//             <span className="text-xs md:text-sm italic text-white/80">
//               #StandWithPalestine #EndTheOccupation
//             </span>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FreePalestine;

/**
 * 2nd design
 */

import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaDove } from "react-icons/fa";

const FreePalestine = () => {
  return (
    <div className="relative bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white w-full py-4 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              i % 2 ? "bg-teal-400/10" : "bg-white/5"
            } rounded-full filter blur-md`}
            style={{
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 30],
              y: [0, (Math.random() - 0.5) * 20],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Glowing border with animation */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-400 to-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="max-w-[82rem] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10">
          {/* Palestine Flag with animation */}
          <motion.div
            className="flex items-center group"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="https://i.ibb.co/4RFJf0dn/PFlag.png"
              alt="Palestine Flag"
              className="h-10 md:h-12 mr-3 rounded-sm shadow-lg border border-white/20"
              whileHover={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 0.5 }}
            />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-wider text-teal-300">
                FREE PALESTINE
              </span>
              <motion.span
                className="text-xs text-white/70 mt-1"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                #EndTheOccupation
              </motion.span>
            </div>
          </motion.div>

          {/* Peace dove icon with animation */}
          <motion.div
            className="hidden md:flex items-center"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <FaDove className="text-white/80 text-2xl mx-2" />
          </motion.div>

          {/* Donation Message with enhanced design */}
          <motion.div
            className="flex items-center bg-gradient-to-r from-teal-500/30 via-teal-600/30 to-teal-700/30 px-5 py-2 rounded-lg border border-teal-400/40 shadow-xl backdrop-blur-sm"
            initial={{ scale: 0.95 }}
            animate={{
              scale: [0.98, 1, 0.98],
              boxShadow: [
                "0 4px 15px rgba(94, 234, 212, 0.1)",
                "0 6px 20px rgba(94, 234, 212, 0.2)",
                "0 4px 15px rgba(94, 234, 212, 0.1)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            whileHover={{ scale: 1.03 }}
          >
            <FaHandHoldingHeart className="text-teal-300 mr-3 text-lg" />
            <div>
              <p className="text-sm md:text-base font-medium leading-tight">
                ১০% টাকা আমাদের ভাইদের সহায়তায় যাবে
              </p>
              <p className="text-xs text-white/70 mt-1">
                Support the people of Palestine
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FreePalestine;

/**
 * 3rd design
 */
