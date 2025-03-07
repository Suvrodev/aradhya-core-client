// import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

// import { AiOutlineMail, AiOutlineHome } from "react-icons/ai";

import fullLogo from "../../../assets/Logo/fullLogo.png";
import { Link } from "react-router";
import goLink from "../../../utils/Fucntion/goLink";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-10  ">
      <div className="px-5 grid md:grid-cols-4 gap-10 ">
        <div className=" flex gap-0 md:gap-6">
          <div className="w-full md:w-[99%] flex flex-col justify-start gap-6 ">
            <div className="flex items-start justify-center md:justify-end gap-4  md:h-[48px] pb-4 border-b  ">
              <img src={fullLogo} alt="" className="w-1/2 md:w-8/12" />
            </div>
            <div className="text-center md:text-right flex flex-col gap-1">
              <p className="text-[16px] md:text-[20px]">
                SIBBARI KHULNA, <br /> BANGLADESH
              </p>
              <p className="text-[16px] md:text-[20px]">+8801745377702</p>
              <p className="text-[16px] md:text-[20px]">
                support@aradhyacore.com
              </p>
            </div>
            <div className="flex space-x-3 justify-center md:justify-end text-lg">
              <Link
                to="#"
                className="text-blue-600"
                onClick={() => {
                  goLink(
                    "https://www.facebook.com/profile.php?id=61572660471299"
                  );
                }}
              >
                <FaFacebookF />
              </Link>
              <Link to="#" className="text-blue-400">
                <FaTwitter />
              </Link>
              <Link to="#" className="text-blue-700">
                <FaYoutube />
              </Link>
              <Link to="#" className="text-blue-500">
                <FaInstagram />
              </Link>
            </div>
          </div>
          <div className="h-full w-[1%] bg-black hidden md:block "></div>
        </div>

        {/* Quick Links */}
        <div className=" flex gap-0 md:gap-6">
          <div className="w-full md:w-[99%] gap-[2px]">
            <h3 className="font-bold text-lg md:text-[32px] pb-4 border-b text-center md:text-end h-auto md:h-[48px]">
              QUICK LINKS
            </h3>
            <div className="mt-3  text-sm md:text-lg flex flex-col items-center md:items-end gap-y-1 ">
              <Link to="#">Free Seminar</Link>
              <Link to="#">Mentor</Link>
              <Link to="#">Success Story</Link>
              <Link to="#">Admission</Link>
              <Link to="#">Blog</Link>
              <Link to="#">FAQ</Link>
              <Link to="#">Privacy Policy</Link>
            </div>
          </div>
          <div className="h-full w-[1%] bg-black hidden md:block "></div>
        </div>

        {/* Others */}
        <div className=" flex gap-0 md:gap-6 ">
          <div className="w-full md:w-[99%] gap-[2px]">
            <h3 className="font-bold  text-lg md:text-[32px] pb-4 border-b text-center md:text-end">
              OTHERS
            </h3>
            <ul className="mt-3  text-sm md:text-lg flex flex-col items-center md:items-end gap-y-1">
              <Link to="#">About Us</Link>
              <Link to="#">Our Achievement</Link>
              <Link to="#">Career Placement</Link>
              <Link to="#">Freelancing</Link>
              <Link to="#">Student Feedback</Link>
              <Link to="#">Contact</Link>
            </ul>
          </div>
          <div className="h-full w-[1%] bg-black hidden md:block "></div>
        </div>

        {/* Subscription Form */}
        <div className="bg-white ">
          <div className="w-full md:max-w-[300px] mx-auto shadow-md  rounded-md  p-5">
            <h3 className="font-bold text-lg text-center">
              Get tips and resources sent to your inbox
            </h3>
            <input
              type="text"
              placeholder="Name"
              className="mt-3 w-full p-2 border rounded bg-white outline-0 shadow-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="mt-3 w-full p-2  rounded bg-white outline-0 shadow-md"
            />
            <button className="mt-3 w-full bg-[#054A5E] text-white p-2 rounded">
              Send
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
