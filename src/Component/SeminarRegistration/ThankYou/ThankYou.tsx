import { useState } from "react";
import { Link, useLocation } from "react-router";

const WHATSAPP_URL =
  "https://chat.whatsapp.com/GmmVEc42X906UKCKxlxnlr?mode=ems_share_t";

const ThankYou = () => {
  const location = useLocation();
  const state = (location.state as { name?: string; course?: string }) || {};
  const name = state.name || "প্রিয় শিক্ষার্থী";
  const course = state.course ? ` (${state.course})` : "";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WHATSAPP_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
      alert("Copy failed. Please copy manually.");
    }
  };

  return (
    // <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
    //   {/* Background pattern layer */}
    //   <div
    //     className="absolute inset-0 bg-cover bg-center opacity-10"
    //     style={{
    //       backgroundImage:
    //         "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166F74' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
    //     }}
    //     aria-hidden="true"
    //   />

    //   {/* Subtle gradient overlay */}
    //   <div
    //     className="absolute inset-0 bg-gradient-to-br from-[#166F74]/10 to-[#25D366]/5"
    //     aria-hidden="true"
    //   />

    //   {/* Content */}
    //   <div className="relative z-10 max-w-2xl w-full">
    //     <div className="rounded-2xl shadow-xl bg-white/95 backdrop-blur-md border border-white/60 overflow-hidden">
    //       {/* Decorative header */}
    //       <div className="h-2 bg-gradient-to-r from-[#166F74] to-[#25D366]"></div>

    //       <div className="p-8 md:p-10 text-center  h-[450px]">
    //         {/* Success badge */}
    //         <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 ring-2 ring-white shadow-lg flex items-center justify-center">
    //           <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-10 w-10 text-white"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeWidth="2"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 12.75l6 6 9-13.5"
    //               />
    //             </svg>
    //           </div>
    //         </div>

    //         <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
    //           ধন্যবাদ, {name}! 🎉
    //         </h1>
    //         <div className="w-20 h-1 bg-gradient-to-r from-[#166F74] to-[#25D366] mx-auto my-4 rounded-full"></div>

    //         <p className="mt-4 text-gray-700 leading-relaxed text-md">
    //           আপনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে{course}। পরবর্তী আপডেট,
    //           সেশন টাইমিং ও গুরুত্বপূর্ণ নির্দেশনা আমরা{" "}
    //           <span className="font-semibold text-[#166F74]">
    //             WhatsApp গ্রুপে
    //           </span>{" "}
    //           জানাবো।
    //         </p>

    //         {/* CTA buttons */}
    //         <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
    //           <a
    //             href={WHATSAPP_URL}
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:brightness-105 transform hover:-translate-y-0.5"
    //           >
    //             {/* WhatsApp icon */}
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-6 w-6"
    //               viewBox="0 0 24 24"
    //               fill="currentColor"
    //             >
    //               <path d="M20.52 3.48A11.91 11.91 0 0012.04 0C5.42 0 .1 5.31.1 11.93c0 2.1.55 4.16 1.6 5.98L0 24l6.24-1.64a11.86 11.86 0 005.8 1.56h.01c6.62 0 11.94-5.31 11.94-11.93 0-3.19-1.24-6.19-3.47-8.51zM12.05 21.3h-.01a9.4 9.4 0 01-4.79-1.3l-.34-.2-3.71.98.99-3.62-.22-.37a9.37 9.37 0 01-1.45-5.06c0-5.17 4.21-9.38 9.4-9.38 2.51 0 4.86.98 6.63 2.75a9.31 9.31 0 012.75 6.62c0 5.17-4.21 9.38-9.25 9.38zm5.4-7.05c-.29-.15-1.72-.85-1.98-.94-.27-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.43-.87-.76-1.46-1.7-1.63-1.99-.17-.29-.02-.45.13-.6.14-.14.29-.37.43-.56.15-.19.2-.33.29-.56.1-.22.05-.41-.02-.56-.07-.15-.65-1.56-.89-2.12-.24-.56-.47-.48-.65-.48h-.56c-.19 0-.48.07-.73.34-.25.26-.96.95-.96 2.32 0 1.37.99 2.69 1.13 2.88.15.19 1.95 2.98 4.72 4.18.66.28 1.18.44 1.58.57.66.21 1.26.18 1.73.11.53-.08 1.72-.7 1.96-1.37.24-.67.24-1.26.17-1.37-.07-.11-.26-.18-.55-.33z" />
    //             </svg>
    //             Join our WhatsApp Group
    //           </a>

    //           <button
    //             onClick={handleCopy}
    //             className="inline-flex items-center justify-center gap-2  px-4 py-2 rounded-xl bg-white text-gray-800 font-semibold shadow border border-gray-300 hover:border-gray-400 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
    //             aria-label="Copy group link"
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className={`h-5 w-5 ${
    //                 copied ? "text-emerald-500" : "text-gray-600"
    //               }`}
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeWidth="2"
    //             >
    //               <rect x="9" y="9" width="13" height="13" rx="2" />
    //               <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    //             </svg>
    //             {copied ? "Copied!" : "Copy link"}
    //           </button>
    //         </div>

    //         {/* Tips / info strip */}

    //         {/* Back link */}
    //         <div className="mt-8 pt-4 border-t border-gray-100">
    //           <Link
    //             to="/"
    //             className="inline-flex items-center text-[#166F74] hover:text-[#25D366] font-medium transition-colors duration-200"
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-5 w-5 mr-2"
    //               viewBox="0 0 20 20"
    //               fill="currentColor"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //             হোম পেজে ফিরে যান
    //           </Link>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Subtle decorative elements */}
    //     <div className="absolute -z-10 -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-200/30 blur-2xl"></div>
    //     <div className="absolute -z-10 -bottom-10 -left-10 h-40 w-40 rounded-full bg-teal-200/30 blur-2xl"></div>
    //   </div>
    // </div>

    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dd5tdfhio/image/upload/v1756076645/bg-1_se3syv.webp')",
        }}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative h-[50px] md:h-auto w-full max-w-2xl -top-[250px] md:-top-10">
        <div className="h-[550px] md:h-auto rounded-2xl shadow-2xl bg-white/95 backdrop-blur-md border border-white/30 overflow-hidden">
          {/* Gradient header strip */}
          <div className="h-2 bg-gradient-to-r from-[#166F74] to-[#25D366]" />

          <div className="p-8 md:p-10 text-center">
            {/* Success badge */}
            <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 ring-2 ring-white shadow-lg flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">
              ধন্যবাদ, {name}! 🎉
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#166F74] to-[#25D366] mx-auto my-4 rounded-full" />

            {/* Description */}
            <p className="mt-4 text-gray-700 leading-relaxed text-sm md:text-md">
              আপনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে{course}। পরবর্তী আপডেট,
              সেশন টাইমিং ও গুরুত্বপূর্ণ নির্দেশনা আমরা{" "}
              <span className="font-semibold text-[#166F74]">
                WhatsApp গ্রুপে
              </span>{" "}
              জানাবো।
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:brightness-105 transform hover:-translate-y-0.5"
              >
                {/* WhatsApp icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.52 3.48A11.91 11.91 0 0012.04 0C5.42 0 .1 5.31.1 11.93c0 2.1.55 4.16 1.6 5.98L0 24l6.24-1.64a11.86 11.86 0 005.8 1.56h.01c6.62 0 11.94-5.31 11.94-11.93 0-3.19-1.24-6.19-3.47-8.51zM12.05 21.3h-.01a9.4 9.4 0 01-4.79-1.3l-.34-.2-3.71.98.99-3.62-.22-.37a9.37 9.37 0 01-1.45-5.06c0-5.17 4.21-9.38 9.4-9.38 2.51 0 4.86.98 6.63 2.75a9.31 9.31 0 012.75 6.62c0 5.17-4.21 9.38-9.25 9.38zm5.4-7.05c-.29-.15-1.72-.85-1.98-.94-.27-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.43-.87-.76-1.46-1.7-1.63-1.99-.17-.29-.02-.45.13-.6.14-.14.29-.37.43-.56.15-.19.2-.33.29-.56.1-.22.05-.41-.02-.56-.07-.15-.65-1.56-.89-2.12-.24-.56-.47-.48-.65-.48h-.56c-.19 0-.48.07-.73.34-.25.26-.96.95-.96 2.32 0 1.37.99 2.69 1.13 2.88.15.19 1.95 2.98 4.72 4.18.66.28 1.18.44 1.58.57.66.21 1.26.18 1.73.11.53-.08 1.72-.7 1.96-1.37.24-.67.24-1.26.17-1.37-.07-.11-.26-.18-.55-.33z" />
                </svg>
                <h2 className="text-sm md:text-[16px]">
                  Join our WhatsApp Group
                </h2>
              </a>

              <button
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-gray-800 font-semibold shadow border border-gray-300 hover:border-gray-400 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                aria-label="Copy group link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    copied ? "text-emerald-500" : "text-gray-600"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <h2 className="text-sm md:text-[16px]">
                  {copied ? "Copied!" : "Copy link"}
                </h2>
              </button>
            </div>

            {/* Back link */}
            <div className="mt-4 md:mt-10 pt-4 border-t border-gray-100">
              <Link
                to="/"
                className="inline-flex items-center text-[#166F74] hover:text-[#25D366] font-medium transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -z-10 -top-16 -right-16 h-64 w-64 rounded-full bg-[#25D366]/20 blur-3xl" />
        <div className="absolute -z-10 -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#166F74]/20 blur-3xl" />
      </div>
    </div>
  );
};

export default ThankYou;
