import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import fullLogo from "../../../assets/Logo/fullLogo.png";
import { Link } from "react-router";
import goLink from "../../../utils/Fucntion/goLink";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-teal-500 to-[#262F51] text-white py-10">
      <div className="px-5 grid md:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {/* Logo and Contact Info */}
        <div className="flex gap-0 md:gap-6">
          <div className="w-full md:w-[99%] flex flex-col justify-start gap-6">
            {/* Logo */}
            <div className="flex items-start justify-center md:justify-end gap-4 md:h-[48px] pb-4 border-b border-white/20">
              <img src={fullLogo} alt="" className="w-1/2 md:w-8/12" />
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right flex flex-col gap-1">
              <p className="text-[16px] md:text-[20px]">
                SHIB BARI KHULNA, <br /> BANGLADESH
              </p>
              <p className="text-[16px] md:text-[20px]">+8801745377702</p>
              <p className="text-[16px] md:text-[20px]">
                support@aradhyacore.com
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-3 justify-center md:justify-end text-lg">
              <Link
                to="#"
                className="text-white hover:text-teal-300 transition-colors"
                onClick={() => {
                  goLink("https://www.facebook.com/aradhyacorebd");
                }}
              >
                <FaFacebookF />
              </Link>
              <Link
                to="#"
                className="text-white hover:text-teal-300 transition-colors"
              >
                <FaTwitter />
              </Link>
              <Link
                to="#"
                className="text-white hover:text-teal-300 transition-colors"
              >
                <FaYoutube />
              </Link>
              <Link
                to="#"
                className="text-white hover:text-teal-300 transition-colors"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
          <div className="h-full w-[1%] bg-white/20 hidden md:block"></div>
        </div>

        {/* Quick Links */}
        <div className="flex gap-0 md:gap-6">
          <div className="w-full md:w-[99%] gap-[2px]">
            <h3 className="font-bold text-lg md:text-[32px] pb-4 border-b border-white/20 text-center md:text-end h-auto md:h-[48px]">
              QUICK LINKS
            </h3>
            <div className="mt-3 text-sm md:text-lg flex flex-col items-center md:items-end gap-y-1">
              <Link to="#" className="hover:text-teal-300 transition-colors">
                Free Seminar
              </Link>
              <Link
                to="/about-us"
                className="hover:text-teal-300 transition-colors"
              >
                Mentor
              </Link>
              {/* <Link to="#" className="hover:text-teal-300 transition-colors">
                Success Story
              </Link> */}
              <Link
                to="/login"
                className="hover:text-teal-300 transition-colors"
              >
                Admission
              </Link>
              <Link
                to="/blog"
                className="hover:text-teal-300 transition-colors"
              >
                Blog
              </Link>
              <Link to="#" className="hover:text-teal-300 transition-colors">
                FAQ
              </Link>
              <Link
                to="/privacy-policy"
                className="hover:text-teal-300 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="h-full w-[1%] bg-white/20 hidden md:block"></div>
        </div>

        {/* Others */}
        <div className="flex gap-0 md:gap-6">
          <div className="w-full md:w-[99%] gap-[2px]">
            <h3 className="font-bold text-lg md:text-[32px] pb-4 border-b border-white/20 text-center md:text-end">
              OTHERS
            </h3>
            <ul className="mt-3 text-sm md:text-lg flex flex-col items-center md:items-end gap-y-1">
              <Link
                to="/about-us"
                className="hover:text-teal-300 transition-colors"
              >
                About Us
              </Link>
              <Link to="#" className="hover:text-teal-300 transition-colors">
                Our Achievement
              </Link>
              <Link to="#" className="hover:text-teal-300 transition-colors">
                Career Placement
              </Link>
              <Link to="#" className="hover:text-teal-300 transition-colors">
                Freelancing
              </Link>
              <Link to="#" className="hover:text-teal-300 transition-colors">
                Student Feedback
              </Link>
              <Link
                to="/contact"
                className="hover:text-teal-300 transition-colors"
              >
                Contact
              </Link>
            </ul>
          </div>
          <div className="h-full w-[1%] bg-white/20 hidden md:block"></div>
        </div>

        {/* Subscription Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="font-bold text-lg text-center mb-4">
            Get tips and resources sent to your inbox
          </h3>
          <input
            type="text"
            placeholder="Name"
            className="mt-3 w-full p-2 border border-white/20 rounded bg-transparent text-white outline-none placeholder-white/50"
          />
          <input
            type="email"
            placeholder="Email"
            className="mt-3 w-full p-2 border border-white/20 rounded bg-transparent text-white outline-none placeholder-white/50"
          />
          <button className="mt-3 w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition-colors">
            Send
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
