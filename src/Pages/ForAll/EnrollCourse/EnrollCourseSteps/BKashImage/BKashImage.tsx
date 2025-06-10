import { useState } from "react";

const BKashImage = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onZoom = (e: any) => {
    setIsZoomed(true);
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    e.currentTarget.querySelector("img").style.transformOrigin = `${x}% ${y}%`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const offZoom = (e: any) => {
    setIsZoomed(false);
    e.currentTarget.querySelector(
      "img"
    ).style.transformOrigin = `center center`;
  };
  return (
    // <div>
    //   <img
    //     // src="https://i.ibb.co.com/x832LqQ8/b-Kash-Transaction.png"
    //     src="https://i.ibb.co/d4YBYGKD/Bkash-process-01.png"
    //     alt=""
    //   />
    // </div>

    <div className="h-full w-full">
      <div
        className="h-full w-full overflow-hidden shadow-lg"
        // id="container"
        onMouseMove={onZoom}
        onMouseOver={onZoom}
        onMouseLeave={offZoom}
      >
        <img
          src="https://i.ibb.co/d4YBYGKD/Bkash-process-01.png"
          alt=""
          className={` w-full h-full object-contain ${
            isZoomed ? "scale-[2.5]" : "scale-100"
          }`}
        />
      </div>
    </div>
  );
};

export default BKashImage;
