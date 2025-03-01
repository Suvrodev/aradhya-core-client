import "./DownloadApp.css";

const imageUrl = "https://i.ibb.co.com/99r9zkFG/Test-01.png";
const DownloadApp = () => {
  return (
    // <div className="bg-gradient-to-r from-[#054148] via-[#12937A] via-[#18B07F] via-[#14A777] to-[#074C3C] h-screen w-full">
    <div className="gradient-bg-App  p-10">
      <div className="flex flex-col-reverse md:flex-row bg-white rounded-lg">
        <div className="w-full md:w-1/2 ">
          <img
            src={imageUrl}
            alt=""
            className="w-full md:w-[460px] rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4 items-start justify-center ">
          <h1 className="text-xl font-bold text-[#101828]">
            ডাউনলোড করুন ওস্তাদ App
          </h1>
          <p className="text-black opacity-65 text-[12px]">
            লাইভ ক্লাসের বেস্ট এক্সপেরিয়েন্স পেতে, এখনই ডাউনলোড করুন ওস্তাদ
            অ্যাপ
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
