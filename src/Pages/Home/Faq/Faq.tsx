import { useLottie } from "lottie-react";
import FQ from "../../../assets/Lottie/questionLottie.json";
const Faq = () => {
  const options = {
    animationData: FQ,
    loop: true,
  };

  const { View } = useLottie(options);

  const questions = [
    "আমরা কি Online এবং Offline Course দুটোই করতে পারবো?",
    " এখন কি কি কোর্স চালু আছে?",
    " কোর্স শেষে আমরা কি কি ধরনের সুবিধা পাবো?",
    " আপনাদের কি সাপোর্ট সেশন থাকবে",
    " আপনাদের কন্টাক্ট নাম্বার?",
  ];

  const answers = [
    "আপাততো Online couse. কিন্তু খুব দ্রুতই আমরা Offline Course start করবো",
    "এখন  Graphics Design, 3D Motion এবং Programming এর কোর্স চালু আছে",
    "Fiver, Upwork, Freeluncher এবং Linkdin এর মাধ্যমে আপনাদের কাজ পাওয়ার সম্পস্ত সিস্টেম দেখিয়ে দেওয়া হবে",
    "হ্যাঁ, অবশ্যই থাকবে। আপনাদের সমস্ত প্রোবলেম Solve করে দেওয়া হবে",
    "আমাদের সাথে 01518748081 এই নাম্বারে ফোনে যোগযোগ করতে পারবেন",
  ];

  return (
    <div className="mt-20">
      <h1 className="text-center text-4xl w-11/12 md:w-1/2 rounded-xl text-white  mx-auto p-4">
        সাধারন প্রশ্ন ও উত্তর
      </h1>

      <div className="flex flex-col md:flex-row items-center bgColor rounded-md mb-10 ">
        <div className="clientQsn w-full md:w-1/2 p-2 md:m-10">
          {questions.map((_question, idx) => (
            <div
              key={idx}
              className="collapse collapse-arrow border-0 bg-[#464444] mb-1"
            >
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                {questions[idx]}
              </div>
              <div className="collapse-content">
                <p className="text-[#4CBD90]"> {answers[idx]} </p>
              </div>
            </div>
          ))}
        </div>

        <div className="anim w-full md:w-1/2 flex items-center justify-center">
          {View}
        </div>
      </div>
    </div>
  );
};

export default Faq;
