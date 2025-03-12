import { useLottie } from "lottie-react";
import successfullAnim from "../../../../assets/Lottie/successful_1.json";
import { useAppSelector } from "../../../../redux/hook";
import { verifyToken } from "../../../../utils/Fucntion/verifyToken";

const EnrollCourseThirdStep = () => {
  const options = {
    animationData: successfullAnim,
    loop: true,
  };

  const { View } = useLottie(options);

  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let student: any;
  if (token) {
    student = verifyToken(token);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white px-4 py-8 sm:px-10 sm:py-12">
      {/* Lottie Animation */}
      <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mb-6 sm:mb-8 transform hover:scale-110 transition-transform duration-300">
        {View}
      </div>

      {/* Congratulations Message */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 text-center shadow-2xl border border-white/20 w-full ">
        <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          Congratulations!
        </p>
        <p className="text-lg sm:text-xl text-purple-200 mb-4 sm:mb-6">
          <span className="font-semibold text-purple-300">{student?.name}</span>
          , আপনি সফলভাবে কোর্সে এনরোল করেছেন!
        </p>
        <p className="text-base sm:text-lg text-purple-100">
          আগামী ২৪ ঘন্টার মধ্যে আপনি আপনার লগইন প্রোফাইলে কোর্সটি দেখতে পারবেন।
          আপনাকে আমাদের WhatsApp গ্রুপে যোগ করে দেওয়া হবে।
        </p>
      </div>

      {/* Badge Button */}
      <button className="mt-8 sm:mt-10 px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center">
        <span className="mr-2">🎉</span>
        View Course
        <span className="ml-2">🚀</span>
      </button>

      {/* Support Team Info */}
      <div className="mt-6 sm:mt-8 text-sm text-purple-300 text-center w-full max-w-md">
        <p className="mb-2">
          আপনার কোর্স সম্পর্কিত যেকোনো প্রশ্ন বা সাহায্যের জন্য, আমাদের সাপোর্ট
          টিমের সাথে যোগাযোগ করুন:
        </p>
        <div className="flex flex-col space-y-2">
          <a
            href="tel:015"
            className="flex items-center justify-center px-4 py-2 bg-purple-800/50 rounded-lg hover:bg-purple-800/70 transition-colors duration-300 text-sm sm:text-base"
          >
            <span className="mr-2">📞</span>
            Support Team Number-1: 015
          </a>
          <a
            href="tel:017"
            className="flex items-center justify-center px-4 py-2 bg-purple-800/50 rounded-lg hover:bg-purple-800/70 transition-colors duration-300 text-sm sm:text-base"
          >
            <span className="mr-2">📞</span>
            Support Team Number-2: 017
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourseThirdStep;
