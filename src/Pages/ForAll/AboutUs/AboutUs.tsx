import logo from "../../../assets/Logo/logo.png";
import {
  FaPaintBrush,
  FaFilm,
  FaGamepad,
  FaCode,
  FaNetworkWired,
} from "react-icons/fa";
import { useTitle } from "../../../Component/hook/useTitle";

const AboutUs = () => {
  useTitle("About us");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-[#262F51] p-4">
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
              src={logo} // Replace with your logo path
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
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Graphics Design */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white hover:scale-105 transition-transform duration-300">
              <FaPaintBrush className="text-4xl mb-4 text-teal-300" />
              <h3 className="text-xl font-bold mb-2">Graphics Design</h3>
              <p className="text-sm text-white/80">
                Creating stunning visuals for branding, marketing, and more.
              </p>
            </div>

            {/* Motion Graphics */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white hover:scale-105 transition-transform duration-300">
              <FaFilm className="text-4xl mb-4 text-teal-300" />
              <h3 className="text-xl font-bold mb-2">Motion Graphics</h3>
              <p className="text-sm text-white/80">
                Bringing ideas to life with dynamic animations and videos.
              </p>
            </div>

            {/* 3D Animation */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white hover:scale-105 transition-transform duration-300">
              <FaFilm className="text-4xl mb-4 text-teal-300" />
              <h3 className="text-xl font-bold mb-2">3D Animation</h3>
              <p className="text-sm text-white/80">
                Crafting immersive 3D experiences for games, films, and more.
              </p>
            </div>

            {/* Game Development */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white hover:scale-105 transition-transform duration-300">
              <FaGamepad className="text-4xl mb-4 text-teal-300" />
              <h3 className="text-xl font-bold mb-2">Game Development</h3>
              <p className="text-sm text-white/80">
                Designing and developing engaging games for all platforms.
              </p>
            </div>

            {/* Programming (C, C++, Python) */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white hover:scale-105 transition-transform duration-300">
              <FaCode className="text-4xl mb-4 text-teal-300" />
              <h3 className="text-xl font-bold mb-2">Programming</h3>
              <p className="text-sm text-white/80">
                Teaching and developing in C, C++, Python, and more.
              </p>
            </div>

            {/* ICT for 11-12 */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white hover:scale-105 transition-transform duration-300">
              <FaCode className="text-4xl mb-4 text-teal-300" />
              <h3 className="text-xl font-bold mb-2">ICT for 11-12</h3>
              <p className="text-sm text-white/80">
                Comprehensive ICT education for high school students.
              </p>
            </div>

            {/* Networking */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white hover:scale-105 transition-transform duration-300">
              <FaNetworkWired className="text-4xl mb-4 text-teal-300" />
              <h3 className="text-xl font-bold mb-2">Networking</h3>
              <p className="text-sm text-white/80">
                Building and managing robust network infrastructures.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-12">
          <p className="text-white/80">
            © 2023 <span className="font-bold text-teal-300">AradhyaCore</span>.
            All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
