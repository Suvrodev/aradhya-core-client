import "./EnrollCourseModal.css";
import { useState } from "react";
import { Modal } from "antd";
import EnrollCourse from "../EnrollCourse";

interface IProps {
  courseId: string;
  courseTitle: string;
  courseImage: string;
  courseDuration: string;
  courseStartDate: string;
  coursePrice: number;
  courseDiscount: number;
}

const EnrollCourseModal = ({
  courseId,
  courseTitle,
  courseImage,
  courseDuration,
  courseStartDate,
  coursePrice,
  courseDiscount,
}: IProps) => {
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
        // title="Enroll Course"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        className="custom-modal"
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "70%",
          xl: "70%",
          xxl: "70%",
        }}
        // bodyStyle={{
        //   maxHeight: "100vh",
        //   overflowY: "auto",
        //   padding: 0,
        // }}
        style={{ height: "100vh", top: 0, padding: 0, color: "while" }} // Full height and no top margin
      >
        <div className="bg-gray-500">
          <EnrollCourse
            courseId={courseId}
            courseDuration={courseDuration}
            courseTitle={courseTitle}
            courseImage={courseImage}
            courseStartDate={courseStartDate}
            coursePrice={coursePrice}
            courseDiscount={courseDiscount}
          />
        </div>
      </Modal>
    </div>
  );
};

export default EnrollCourseModal;
