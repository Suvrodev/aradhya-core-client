import Banner from "./Banner/Banner";
import DownloadApp from "./DownloadApp/DownloadApp";
import Faq from "./Faq/Faq";
import OurCourses from "./OurCourses/OurCourses";
import Ostad from "./Review/Ostad/Ostad";

const Home = () => {
  return (
    <div className="w-full md:w-[70rem] mx-auto">
      <h1>This is Home Page</h1>
      <div className="">
        <Banner />
      </div>
      <div className="max-w-[82rem] mx-auto px-0 md:px-10">
        <OurCourses />
      </div>
      <div className="max-w-[82rem] mx-auto px-0 md:px-10">
        <Faq />
      </div>
      {/* <div className="myColor">Div</div> */}
      <div className="max-w-[82rem] mx-auto px-0 md:px-10">
        <DownloadApp />
      </div>
      {/* <Review /> */}
      <Ostad />
    </div>
  );
};

export default Home;
