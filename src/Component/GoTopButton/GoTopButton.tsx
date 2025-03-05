import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const GoTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTopButton && (
        <div
          className="px-[15px] py-[12px] rounded-md primaryBgColor fixed bottom-[30px] right-[50px] cursor-pointer "
          onClick={scrollUp}
        >
          {" "}
          <ArrowUpwardIcon className="text-[#FFFFFF]" />
        </div>
      )}
    </div>
  );
};

export default GoTopButton;
