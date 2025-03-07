import { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import BuyCourseFirstStep from "./EnrollCourseSteps/EnrollCourseFirstStep";
import BuyCourseSecondStep from "./EnrollCourseSteps/EnrollCourseSecondStep";

interface IProps {
  courseId: string;
  courseTitle: string;
  courseImage: string;
}

const EnrollCourse = ({ courseId, courseTitle, courseImage }: IProps) => {
  const [activeStep, setActiveStep] = useState(0);

  console.log("Active Step: ", activeStep);

  return (
    <div className="w-11/12 mx-auto  rounded-lg">
      <div>
        {activeStep == 0 && (
          <BuyCourseFirstStep
            courseId={courseId}
            courseTitle={courseTitle}
            courseImage={courseImage}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        )}
        {activeStep == 1 && (
          <BuyCourseSecondStep
            courseId={courseId}
            courseTitle={courseTitle}
            courseImage={courseImage}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        )}
      </div>

      <Stepper
        className="bg-yellow-400 p-0"
        activeStep={activeStep}
        styleConfig={{
          activeBgColor: "#2196F3",
          activeTextColor: "#ffffff",
          completedBgColor: "#4CAF50",
          completedTextColor: "#000000",
          inactiveBgColor: "gray",
          inactiveTextColor: "black",
          size: 40, // Default size
          circleFontSize: 14, // Font size for the step number
          labelFontSize: 12, // Font size for the label
          borderRadius: "50%", // Round step circles
          fontWeight: 500, // Medium font weight
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
