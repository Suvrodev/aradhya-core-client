// src/pages/AboutUs/AboutServiceBox.tsx
import React from "react";

interface AboutServiceBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AboutServiceBox: React.FC<AboutServiceBoxProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white hover:scale-[1.03] transition-all duration-300 border border-white/10 hover:border-teal-300/30 shadow-lg hover:shadow-teal-300/20">
      <div className="relative inline-block mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full text-3xl text-white shadow-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-teal-200 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-white/80 group-hover:text-white/90 transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};

export default AboutServiceBox;
