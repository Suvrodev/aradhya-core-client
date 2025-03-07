interface IProps {
  courseId: string;
  courseTitle: string;
  courseImage: string;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const EnrollCourseSecondStep = ({
  courseId,
  courseTitle,
  courseImage,
  activeStep,
  setActiveStep,
}: IProps) => {
  return (
    <div>
      <h1> Course Second Step</h1>
    </div>
  );
};

export default EnrollCourseSecondStep;
