import { useState } from "react";
import { Modal } from "antd";
import BuyCourseStep from "../EnrollCourse";

interface IProps {
  courseId: string;
  courseTitle: string;
  courseImage: string;
}

const EnrollCourseModal = ({ courseId, courseTitle, courseImage }: IProps) => {
  //   Modal Default Class start
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //   Modal Default Class end

  return (
    <div className="">
      <div onClick={showModal}>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105">
          Enroll Now
        </button>
      </div>
      <Modal
        title="Enroll Course"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "50%",
          xl: "50%",
          xxl: "60%",
        }}
      >
        <div className="form-container ">
          <BuyCourseStep
            courseId={courseId}
            courseTitle={courseTitle}
            courseImage={courseImage}
          />
        </div>
      </Modal>
    </div>
  );
};

export default EnrollCourseModal;
