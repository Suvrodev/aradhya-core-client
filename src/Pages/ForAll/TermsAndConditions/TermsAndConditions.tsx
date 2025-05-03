import goLink from "../../../utils/Fucntion/goLink";
import sendEmail from "../../../utils/Fucntion/sendEmail";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto backdrop-blur-md bg-white/5 rounded-2xl p-8 shadow-2xl border border-white/10">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          📜 Terms and Conditions
        </h1>

        <section className="space-y-8 text-white/90 leading-[26px]">
          <div>
            <span className="font-bold">
              {" "}
              স্বাগতম <strong>AradhyaCore.com</strong> এ!
            </span>{" "}
            <br />
            <p className="mt-2">
              এই ওয়েবসাইটটি ব্যবহার করার মাধ্যমে আপনি আমাদের নির্ধারিত টার্মস
              এবং কন্ডিশনস মেনে চলতে সম্মত হচ্ছেন। এই নীতিমালাগুলো 'Aradhya
              Core' এর সেবার মান বজায় রাখা ও ব্যবহারকারীদের সুরক্ষা নিশ্চিত
              করার জন্য প্রণীত।
            </p>
          </div>

          <div className="w-full h-[1px] bg-white"></div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">১. সংজ্ঞা</h2>
            <ul className="list-disc pl-10 space-y-1">
              <li>
                “আমরা”, “আমাদের”, <strong>"Aradhya Core"</strong> বলতে
                <strong> AradhyaCore.com</strong>-এর কর্তৃপক্ষ বা টিমকে বোঝানো
                হয়েছে।
              </li>
              <li>
                “আপনি”, “ব্যবহারকারী” বলতে ওয়েবসাইটের যেকোনো দর্শক,
                ব্যবহারকারী, গ্রাহক বা শিক্ষার্থীকে বোঝানো হয়েছে।
              </li>
            </ul>
          </div>

          <div className="w-full h-[1px] bg-white"></div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              ২. কনটেন্টের মালিকানা ও কপিরাইট
            </h2>
            <ul className="list-disc pl-10 space-y-1">
              <li>
                এই ওয়েবসাইটে থাকা সমস্ত টেক্সট, কোর্স, ভিডিও, চিত্র, কোড,
                সফটওয়্যার, ও ডিজাইন আমাদের নিজস্ব অথবা লাইসেন্সপ্রাপ্ত কনটেন্ট।
              </li>
              <li>
                কোনোভাবেই আমাদের অনুমতি ছাড়া এসব কনটেন্ট কপি, বিক্রয়,
                পুনঃপ্রকাশ, বা অন্য কারো সঙ্গে শেয়ার করা যাবে না।
              </li>
              <li>
                আমাদের কনটেন্ট ফেসবুক, ইউটিউব, গুগল ড্রাইভ, পেনড্রাইভ বা অন্য
                কোনো মাধ্যমে শেয়ার করলে আইনানুগ ব্যবস্থা নেওয়া হবে।
              </li>
            </ul>
          </div>

          <div className="w-full h-[1px] bg-white"></div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              ৩. একাউন্ট ব্যবস্থাপনা
            </h2>
            <ul className="list-disc pl-10 space-y-1">
              <li>
                প্রতিটি ব্যবহারকারীর ইউজারনেম ও পাসওয়ার্ড সম্পূর্ণভাবে
                ব্যক্তিগত এবং নিরাপদভাবে সংরক্ষণ করা আবশ্যক।
              </li>
              <li>
                পাসওয়ার্ড অন্য কাউকে দিলে বা একাধিক ডিভাইস থেকে সন্দেহজনক লগইন
                ধরা পড়লে একাউন্ট সাময়িকভাবে বন্ধ করে দেওয়া হতে পারে।
              </li>
            </ul>
          </div>
          <div className="w-full h-[1px] bg-white"></div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              ৪. কোর্স ও সার্ভিস শর্তাবলী
            </h2>
            <ul className="list-disc pl-10 space-y-1">
              <li>
                কোর্সে ভর্তি হওয়ার আগে কারিকুলাম ও বিস্তারিত তথ্য ভালোভাবে পড়ে
                নিশ্চিত হয়ে ভর্তি হতে হবে।
              </li>
              <li>
                কোর্স শুরু হওয়ার পরে ইমেইল পরিবর্তন বা একাউন্ট ট্রান্সফার করা
                যাবে না।
              </li>
              <li>
                লাইভ ক্লাসে অংশগ্রহণ, অ্যাসাইনমেন্ট সাবমিট এবং নির্দিষ্ট সময়ে
                কোর্স সম্পন্ন করা শিক্ষার্থীর দায়িত্ব।
              </li>
            </ul>
          </div>
          <div className="w-full h-[1px] bg-white"></div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              ৫. পেমেন্ট ও রিফান্ড
            </h2>
            <ul className="list-disc pl-10 space-y-1">
              <li>
                সকল পেমেন্ট আমাদের নির্ধারিত মাধ্যম <strong>bKash</strong> এর
                মাধ্যমে সম্পন্ন করতে হবে।
              </li>
              <li>
                <strong>
                  {" "}
                  কোনো কোর্সের ক্লাস শুরু হওয়ার পরে, কোনো প্রকার রিফান্ডের সুযোগ
                  নেই।
                </strong>{" "}
                অর্থাৎ, একবার ভর্তি সম্পন্ন হলে সেটি বাতিল বা ফেরতযোগ্য নয়।
              </li>
            </ul>
          </div>
          <div className="w-full h-[1px] bg-white"></div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">৬. আচরণ বিধি</h2>
            <ul className="list-disc pl-10 space-y-1">
              <li>
                Aradhya Core-এর Facebook পেজ, গ্রুপ, কমিউনিটি বা লাইভ ক্লাসে
                শিষ্টাচার বজায় রাখতে হবে।
              </li>
              <li>
                কাউকে আক্রমণ, কটুক্তি, রাজনৈতিক মন্তব্য, অথবা স্প্যামিং করলে
                কর্তৃপক্ষ তার একাউন্ট নিষ্ক্রিয় করে দিতে পারে।
              </li>
              <li>
                কনটেন্ট পাইরেসি বা অবৈধভাবে তথ্য ছড়ানোর চেষ্টা করলে আইনগত
                ব্যবস্থা নেওয়া হবে।
              </li>
            </ul>
          </div>
          <div className="w-full h-[1px] bg-white"></div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              ৭. পরিবর্তনের অধিকার
            </h2>
            <ul className="list-disc pl-10 space-y-1">
              <li>
                Aradhya Core যেকোনো সময় এই টার্মস এবং কন্ডিশনস আপডেট, পরিবর্তন
                বা পরিবর্ধন করার অধিকার সংরক্ষণ করে।
              </li>
              <li>
                পরিবর্তন হলে তা ওয়েবসাইটে প্রকাশ করা হবে এবং প্রয়োজনে
                ব্যবহারকারীকে ইমেইলে জানানো হতে পারে।
              </li>
            </ul>
          </div>
          <div className="w-full h-[1px] bg-white"></div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">৮. যোগাযোগ</h2>
            <p>
              যেকোনো জিজ্ঞাসা বা অভিযোগের জন্য আমাদের অফিসিয়াল ইমেইল{" "}
              <span
                className="cursor-pointer"
                onClick={() => sendEmail("support@aradhyacore.com")}
              >
                support@aradhyacore.com
              </span>{" "}
              অথবা
              <span
                className="cursor-pointer"
                onClick={() => {
                  goLink("https://www.facebook.com/aradhyacorebd");
                }}
              >
                {" "}
                Facebook Page
              </span>{" "}
              যোগাযোগ করুন।
            </p>
          </div>
          <h1>
            আশা করছি, উপরের টার্মস এবং কন্ডিশনসগুলো মেনে চলবেন এবং পরিপূর্ণভাবে
            কোর্সটি সম্পন্ন করবেন।{" "}
          </h1>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
