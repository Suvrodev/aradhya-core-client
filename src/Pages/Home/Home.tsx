import Banner from "./Banner/Banner";
import DownloadApp from "./DownloadApp/DownloadApp";
import Faq from "./Faq/Faq";
import OurCourses from "./OurCourses/OurCourses";
import Ostad from "./Review/Ostad/Ostad";
import Review from "./Review/Review";

const Home = () => {
  return (
    <div>
      <h1>This is Home Page</h1>
      <div className="max-w-[82rem] mx-auto px-0 md:px-10">
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
