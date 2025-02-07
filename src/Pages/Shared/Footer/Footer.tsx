import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";
import { AiOutlineMail, AiOutlineHome } from "react-icons/ai";
import footerImage from "../../../assets/Logo/Header_1.png";
import footerText from "../../../assets/Logo/Header_2.png";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5dc] text-gray-800 py-10">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl ">
        {/* Logo and App Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <img
              src={footerImage} // Replace with your logo file
              alt="AradhyaCore"
              className="w-[65px] h-[65px] mr-2"
            />
            <img src={footerText} alt="" className="w-[150px]" />
          </h2>
          <p className="mb-4">অনলাইন লাইভ ফ্রি ডেভেলপমেন্ট প্ল্যাটফর্ম।</p>
          <h3 className="font-semibold mb-2">ডাউনলোড করুন ওস্তাদ অ্যাপ</h3>
          <div className="flex gap-3">
            <button className="bg-black text-white px-4 py-2 rounded-lg">
              Play Store
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg">
              App Store
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg">
              Windows
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">কুইক লিঙ্ক</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                লাইভ ব্যাচ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                ফ্রি কোর্সমুফত
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                লাইভ ওয়েবিনার
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                ব্লগ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-3">যোগাযোগ</h3>
          <p className="flex items-center mb-2">
            <AiOutlineMail className="mr-2" />
            <a href="mailto:support@ostad.app" className="hover:underline">
              support@ostad.app
            </a>
          </p>
          <p className="flex items-center">
            <AiOutlineHome className="mr-2" />
            Ka-6/a, Navana Sylvania, Baridhara Road, Nadda, Gulshan-2,
            Dhaka-1212
          </p>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold mb-3">কোম্পানি</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                আমাদের সম্পর্কে
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                রিফান্ড পলিসি
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                প্রাইভেসী পলিসি
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                টার্মস এবং শর্তাবলী
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-10 border-t border-gray-300 pt-6 text-center">
        <h3 className="mb-4 font-semibold">কমিউনিটি এর সাথে কানেক্টেড থাকতে</h3>
        <div className="flex justify-center gap-6">
          <a href="#" className="text-2xl text-blue-500">
            <FaFacebook />
          </a>
          <a href="#" className="text-2xl text-pink-500">
            <FaInstagram />
          </a>
          <a href="#" className="text-2xl text-black">
            <FaTiktok />
          </a>
          <a href="#" className="text-2xl text-blue-700">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
