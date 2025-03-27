import { FaFacebookF, FaYoutube, FaPhoneAlt, FaTag } from "react-icons/fa";
import { Mail } from "lucide-react";

import { motion } from "framer-motion";
import { useGetSpecificPromoCodeQuery } from "../../../redux/api/features/PromoCode/promoCodeManagementApi";
import { TPromoCode } from "../../../utils/types/globalTypes";
import goCall from "../../../utils/Fucntion/goCall";
import sendEmail from "../../../utils/Fucntion/sendEmail";
import goLink from "../../../utils/Fucntion/goLink";

const NoticeHeader = () => {
  // Retrieve promocode
  const { data: promocodeData } = useGetSpecificPromoCodeQuery(
    import.meta.env.VITE_PROMOCODE_ID
  );
  const promoData: TPromoCode = promocodeData?.data;

  return (
    <div className="relative bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white w-full py-3 md:py-2 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -left-10 w-20 h-20 bg-teal-400/10 rounded-full filter blur-md"
          animate={{ x: [0, 10, 0], y: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        <motion.div
          className="absolute -bottom-10 -right-10 w-24 h-24 bg-teal-300/10 rounded-full filter blur-md"
          animate={{ x: [0, -5, 0], y: [0, -3, 0] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
      </div>

      {/* Enhanced glowing border bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-400/70 to-transparent"></div>

      <div className="max-w-[82rem] mx-auto px-4 md:px-4">
        <div className="flex md:flex-row justify-between items-center">
          {/* Number and mail for all */}
          <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center gap-1 md:gap-6 w-full md:w-auto">
            <motion.div
              className="flex items-center space-x-2 select-text"
              whileHover={{ scale: 1.02 }}
            >
              <FaPhoneAlt className="text-teal-300 text-sm" />
              <span className="text-[10px] md:text-sm font-medium selectable-text">
                <span onClick={() => goCall("01951912997")}> 01951912997</span>,
                <span onClick={() => goCall("01745377702")}> 01745377702</span>
              </span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 select-text"
              whileHover={{ scale: 1.02 }}
            >
              <Mail className="text-teal-300 size-4 md:size-5 md:text-sm" />
              <span
                className="text-[10px] md:text-sm font-medium tracking-wide"
                onClick={() => sendEmail("support@aradhyacore.com")}
              >
                support@aradhyacore.com
              </span>
            </motion.div>
          </div>

          {/* Only Desktop: Promo Code and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              className="flex items-center bg-gradient-to-r from-teal-500/20 to-teal-600/20 px-4 py-1 rounded-full border border-teal-400/30 shadow-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
              }}
            >
              <FaTag className="text-teal-300 mr-2" />
              <span className="text-sm font-medium tracking-wider">
                USE CODE:
              </span>
              <span className="text-teal-300 font-bold ml-1 tracking-widest">
                {promoData?.promoCode || "PROMO123"}
              </span>
            </motion.div>
            <a
              href="#"
              className="text-white/80 hover:text-teal-300 transition-colors duration-300"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-teal-300 transition-colors duration-300"
            >
              <FaYoutube className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Device ---------------------------------------------------------------------------------------------------------- */}

          <div className="md:hidden w-full flex flex-col items-end px-0">
            {/* Mobile Promo Code (Updated to be more compact & single line) */}
            <motion.div
              className="flex justify-center items-center w-full bg-gradient-to-r from-teal-500/30 to-teal-600/30 px-4 py-1.5 rounded-full border border-teal-400/40 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
              }}
            >
              <FaTag className="text-teal-300 size-3 mr-1" />
              <span className="text-[9px] font-medium tracking-wide">
                Promo Code:
              </span>
              <span className="text-[9px] text-teal-300 font-bold ml-1 tracking-widest">
                {promoData?.promoCode || "PROMO123"}
              </span>
            </motion.div>

            {/* Mobile Icons (Centered Below Promo Code) */}
            <motion.div
              className="flex items-center justify-end gap-2 mt-2 mr-1 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.a
                href="#"
                className="text-white/90 hover:text-teal-300 transition-colors duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebookF
                  className="w-4 h-4"
                  onClick={() =>
                    goLink("https://www.facebook.com/suvrodev.1122/")
                  }
                />
              </motion.a>
              <motion.a
                href="#"
                className="text-white/90 hover:text-teal-300 transition-colors duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaYoutube className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeHeader;
