// src/pages/AboutUs/AboutUs.tsx
import logo from "../../../assets/Logo/logo.png";
import {
  FaPaintBrush,
  FaFilm,
  FaGamepad,
  FaCode,
  FaNetworkWired,
  FaWordpress,
} from "react-icons/fa";
import { SiCisco, SiAdobeaftereffects, SiFigma } from "react-icons/si";
import { FaCube, FaPalette, FaChartLine } from "react-icons/fa";

import { useTitle } from "../../../Component/hook/useTitle";
import { useGetAllOurPeopleQuery } from "../../../redux/api/features/OurPeople/ourPeopleManagementApi";
import { TOurPeople } from "../../../utils/types/globalTypes";
import PeopleBox from "../../AdminDashboard/AdminOurPeople/PeopleBox/PeopleBox";
import AboutServiceBox from "./AboutServiceBox";

const AboutUs = () => {
  useTitle("About us");

  const { data, isLoading } = useGetAllOurPeopleQuery(undefined);
  const ourPeoples = data?.data;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-[#262F51] p-4">
      <section className="w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden p-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            About AradhyaCore
          </h1>
          <p className="text-lg text-white/80">
            Empowering innovation through technology and creativity.
          </p>
        </div>

        {/* Logo Section */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <img
              src={logo}
              alt="AradhyaCore Logo"
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>

        {/* About Us Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Who We Are</h2>
          <p className="text-white/80 leading-relaxed">
            Welcome to{" "}
            <span className="font-bold text-teal-300">AradhyaCore</span>, your
            trusted IT center for cutting-edge technology solutions and creative
            services. We are dedicated to providing high-quality education and
            services in various fields of IT and design, helping individuals and
            businesses achieve their goals.
          </p>
        </div>

        {/* Services Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AboutServiceBox
              icon={<FaPaintBrush className="text-white" />}
              title="Graphics Design"
              description="Stunning visuals for branding and promotions."
            />
            <AboutServiceBox
              icon={<SiAdobeaftereffects className="text-white" />}
              title="Motion Graphics"
              description="Dynamic animation for storytelling and ads."
            />
            <AboutServiceBox
              icon={<FaCube className="text-white" />} // Changed from FaFilm to FaCube for 3D
              title="3D Fundamentals"
              description="Complete training in 3D design and animation."
            />
            <AboutServiceBox
              icon={<FaPalette className="text-white" />} // Changed for Modeling & Texturing
              title="Modeling & Texturing"
              description="Game-ready asset creation with real-time optimization."
            />
            <AboutServiceBox
              icon={<FaGamepad className="text-white" />}
              title="Game Development"
              description="Creating interactive games for diverse platforms."
            />
            <AboutServiceBox
              icon={<FaFilm className="text-white" />} // Changed from SiAdobepremierepro
              title="Video Editing"
              description="Zero to Hero course in cinematic editing."
            />
            <AboutServiceBox
              icon={<FaNetworkWired className="text-white" />} // Changed from SiMikrotik
              title="MikroTik & OLT"
              description="Professional router and fiber network configuration."
            />
            <AboutServiceBox
              icon={<SiCisco className="text-white" />}
              title="CCNA"
              description="Cisco Certified Network Associate training."
            />
            <AboutServiceBox
              icon={<FaCode className="text-white" />}
              title="C, C++, Python"
              description="Learn programming from fundamentals to OOP."
            />
            <AboutServiceBox
              icon={<FaChartLine className="text-white" />} // Added for Digital Marketing
              title="Digital Marketing"
              description="Master online marketing, SEO, and analytics."
            />
            <AboutServiceBox
              icon={<FaWordpress className="text-white" />}
              title="WordPress"
              description="Website building with themes, plugins, and CMS."
            />
            <AboutServiceBox
              icon={<SiFigma className="text-white" />}
              title="UI/UX Designing"
              description="Design engaging and intuitive user experiences."
            />
          </div>
        </div>

        {/* Team Section */}
        {isLoading ? (
          <div>
            <span className="loading loading-spinner text-neutral"></span>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                The talented individuals who make{" "}
                <span className="bg-gradient-to-r from-teal-300 via-teal-500 to-teal-200 bg-clip-text text-transparent font-bold animate-gradient bg-300% animate-gradient-x">
                  Aradhya Core
                </span>{" "}
                organization great
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ourPeoples?.map((people: TOurPeople, idx: number) => (
                <PeopleBox key={idx} people={people} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AboutUs;
