import "./Home.css";
import Banner from "./Banner/Banner";
import DownloadApp from "./DownloadApp/DownloadApp";
import Faq from "./Faq/Faq";
import OurCourses from "./OurCourses/OurCourses";
import Ostad from "./Review/Ostad/Ostad";
import FreeSeminer from "./FreeSeminer/FreeSeminer";

const Home = () => {
  return (
    <div className="mainContainer">
      <div className="container banner">
        <Banner />
      </div>
      <div className="container banner">
        <OurCourses />
      </div>
      <div className="container banner">
        <FreeSeminer />
      </div>
      <div className="container">
        <Faq />
      </div>
      {/* <div className="myColor">Div</div> */}
      <div className="max-w-[82rem] mx-auto px-0 md:px-10 hidden">
        <DownloadApp />
      </div>
      {/* <Review /> */}
      <div className="hidden">
        <Ostad />
      </div>
    </div>
  );
};

export default Home;
