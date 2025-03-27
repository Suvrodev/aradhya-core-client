import "./Banner.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { TBanner } from "../../../../utils/types/globalTypes";
import BannerContent from "./BannerContent/BannerContent";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    axios
      .get("/sliderImages.json")
      .then((res) => {
        setBannerData(res.data);
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  //   console.log("Images: ", images);

  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, 6000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, [bannerData.length, currentIndex]); // Reset interval when currentIndex changes

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStart = (e: any) => {
    startX.current = e.clientX || e.touches[0].clientX;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMove = (e: any) => {
    if (startX.current === null) return;

    const x = e.clientX || e.touches[0].clientX;
    const deltaX = x - startX.current;

    if (deltaX > 50) {
      // Swipe right
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? bannerData.length - 1 : prevIndex - 1
      );
      startX.current = null;
    } else if (deltaX < -50) {
      // Swipe left
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
      startX.current = null;
    }
  };

  const handleEnd = () => {
    startX.current = null;
  };

  return (
    <div
      className="relative w-full h-[460px] md:h-[400px] overflow-hidden rounded-lg border-[4px] border-white  innerShadw"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      {bannerData.map((banner: TBanner, index: number) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: "0",
            left: `${index * 100}%`,
            width: "100%",
            height: "100%",
            transition: "transform 0.5s ease",
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          className=" "
        >
          <BannerContent banner={banner} />
        </div>
      ))}

      <div className="absolute bottom-1/2 md:bottom-3 left-1/2 transform -translate-x-1/2 flex gap-4 rounded-xl ">
        {bannerData.map((_, index) => (
          <p
            key={index}
            className={`w-[10px] h-[5px] bg-yellow-900 rounded-full transition-width duration-500 ease-in-out  ${
              currentIndex === index ? "w-[35px]" : "w-[10px]"
            } `}
          ></p>
        ))}
      </div>
    </div>
  );
};

export default Banner;
