import "./Review.css";

const testimonials = [
  {
    name: "Faisal Azam Siddiqui",
    role: "Full Stack Web Development with MERN Batch 1",
    quote: "ওস্তাদ-এর MERN কোর্স ছিল ডেভেলপমেন্টের জন্য অনেক ফ্রুটফুল।...",
    initials: "FA",
  },
  {
    name: "Shafayet Rana",
    role: "UX/UI Batch 6",
    quote: "Ostad এর বিশ্বাসযোগ্য ডি...",
    initials: "SR",
  },
  {
    name: "Abu Hasan",
    role: "UX/UI Batch 17",
    quote: "ক্লাস মাল্টিমিডিয়া হেজান...",
    initials: "AH",
  },
  {
    name: "Jahid Hossain",
    role: "Full Stack Web Development with MERN Batch 2",
    quote: "এই কোর্সটি হচ্ছে আমার লা...",
    initials: "JH",
  },
  {
    name: "Md Ashfaque Ul Hoque",
    role: "UX/UI Batch 6",
    quote: "সাজানো (গাইডলাইন সহ...)...",
    initials: "MH",
  },
  {
    name: "MD Galib Hasan",
    role: "Data Science Certificate Program Batch 09",
    quote: "Even though I come...",
    initials: "MG",
  },
  {
    name: "ARM Salahuddin",
    role: "Data Science Certificate Program Batch 19",
    quote: "The Data Science program delivered...",
    initials: "AS",
  },
  {
    name: "Nayem Islam",
    role: "Full Stack Web Development with MERN Batch 2",
    quote: "MERN নিয়ে আমার...",
    initials: "NI",
  },
];

const Review = () => {
  return (
    // <div className="grid grid-cols-2 gap-6 p-8">
    //   {testimonials.map((testimonial, index) => (
    //     <div
    //       key={index}
    //       className="bg-white shadow-lg p-4 rounded-2xl border border-gray-200"
    //     >
    //       <div className="flex items-center mb-4">
    //         <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full text-lg font-bold">
    //           {testimonial.initials}
    //         </div>
    //         <div className="ml-4">
    //           <h3 className="text-lg font-semibold">{testimonial.name}</h3>
    //           <p className="text-sm text-gray-600">{testimonial.role}</p>
    //         </div>
    //       </div>
    //       <p className="text-gray-800">{testimonial.quote}</p>
    //     </div>
    //   ))}
    // </div>

    // <div className="container">
    //   {testimonials.map((testimonial, index) => (
    //     <div
    //       key={index}
    //       className={`item item-${
    //         index + 1
    //       } bg-white shadow-lg p-4 rounded-2xl border border-gray-200`}
    //     >
    //       <div className="flex items-center mb-4">
    //         <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full text-lg font-bold">
    //           {testimonial.initials}
    //         </div>
    //         <div className="ml-4">
    //           <h3 className="text-lg font-semibold">{testimonial.name}</h3>
    //           <p className="text-sm text-gray-600">{testimonial.role}</p>
    //         </div>
    //       </div>
    //       <p className="text-gray-800">{testimonial.quote}</p>
    //     </div>
    //   ))}
    // </div>

    // DeepSeek-1
    <div className="review-container">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`review-item item-${
            index + 1
          } bg-gradient-to-br from-white/90 to-indigo-50/50 backdrop-blur-sm`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white rounded-xl text-lg font-bold shadow-sm">
              {testimonial.initials}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">
                {testimonial.name}
              </h3>
              <p className="text-sm text-indigo-600/90 font-medium">
                {testimonial.role}
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed text-[15px]">
            {testimonial.quote}
          </p>
          <div className="absolute bottom-4 right-4 text-indigo-400/40 text-5xl font-serif">
            ”
          </div>
        </div>
      ))}
    </div>

    ///Deepseek-2
    // <div className="review-container">
    //   {testimonials.map((testimonial, index) => (
    //     <div
    //       key={index}
    //       className={`review-item bg-white rounded-xl shadow-sm border border-gray-100`}
    //     >
    //       <div className="flex items-center mb-4">
    //         <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white rounded-lg text-lg font-bold">
    //           {testimonial.initials}
    //         </div>
    //         <div className="ml-4">
    //           <h3 className="text-lg font-semibold text-gray-800">
    //             {testimonial.name}
    //           </h3>
    //           <p className="text-sm text-gray-500">{testimonial.role}</p>
    //         </div>
    //       </div>
    //       <p className="text-gray-600 leading-relaxed text-[15px]">
    //         {testimonial.quote}
    //       </p>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Review;
