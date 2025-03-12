import "./EnrollCourse.css";
import { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import EnrollCourseFirstStep from "./EnrollCourseSteps/EnrollCourseFirstStep";
import EnrollCourseSecondStep from "./EnrollCourseSteps/EnrollCourseSecondStep";

interface IProps {
  courseId: string;
  courseTitle: string;
  courseImage: string;
  courseDuration: string;
  courseStartDate: string;
  coursePrice: number;
  courseDiscount: number;
}

const EnrollCourse = ({
  courseId,
  courseTitle,
  courseImage,
  courseDuration,
  courseStartDate,
  coursePrice,
  courseDiscount,
}: IProps) => {
  const [activeStep, setActiveStep] = useState(0);

  console.log("Active Step: ", activeStep);

  return (
    <div className="w-full rounded-lg bg-[#2D3035]">
      <div className="">
        {activeStep == 0 && (
          <EnrollCourseFirstStep
            courseId={courseId}
            courseDuration={courseDuration}
            courseTitle={courseTitle}
            courseImage={courseImage}
            activeStep={activeStep}
            courseStartDate={courseStartDate}
            coursePrice={coursePrice}
            courseDiscount={courseDiscount}
            setActiveStep={setActiveStep}
          />
        )}
        {activeStep == 1 && (
          <EnrollCourseSecondStep
          // courseId={courseId}
          // courseTitle={courseTitle}
          // courseImage={courseImage}
          // activeStep={activeStep}
          // setActiveStep={setActiveStep}
          />
        )}
      </div>

      <Stepper
        className="stepStype"
        activeStep={activeStep}
        styleConfig={{
          activeBgColor: "#2196F3",
          activeTextColor: "#ffffff", // Text color for active step
          completedBgColor: "#4CAF50",
          completedTextColor: "#000000", // Text color for completed step
          inactiveBgColor: "gray",
          inactiveTextColor: "white", // Text color for inactive steps
          size: 40,
          circleFontSize: 14,
          labelFontSize: 12,
          borderRadius: "50%",
          fontWeight: 500,
          activeColor: "purple",
          stepSize: "5em",
        }}
      >
        <Step label="Step 1" />
        <Step label="Step 2" />
      </Stepper>
    </div>
  );
};

export default EnrollCourse;
