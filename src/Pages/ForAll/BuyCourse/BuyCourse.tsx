import { useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";

const BuyCourse = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [confirm, setConfirm] = useState(false);
  const nextStep = () => setActiveStep((prev) => prev + 1);
  useEffect(() => {
    if (activeStep == 4) {
      setConfirm(true);
    }
  }, [activeStep]);

  return (
    <div className="w-11/12 mx-auto bg-green-600/30 p-4 rounded-lg">
      <Stepper
        activeStep={activeStep}
        styleConfig={{
          activeBgColor: "#2196F3",
          activeTextColor: "#ffffff",
          completedBgColor: "#4CAF50",
          completedTextColor: "#000000",
          inactiveBgColor: "white",
          inactiveTextColor: "black",
          size: 24, // Default size
          circleFontSize: 14, // Font size for the step number
          labelFontSize: 12, // Font size for the label
          borderRadius: "50%", // Round step circles
          fontWeight: 500, // Medium font weight
        }}
      >
        <Step label="Step 1" />
        <Step label="Step 2" />
        <Step label="Step 3" />
        <Step label="Confirm" />
      </Stepper>
      <div className="flex gap-4 mt-4">
        <button className="btn btn-info" onClick={nextStep}>
          Next
        </button>
      </div>
      {confirm && (
        <p className="text-green-500 font-bold text-center"> হইছে ভাই </p>
      )}
    </div>
  );
};

export default BuyCourse;
