import { Modal } from "antd";
import { Settings } from "lucide-react";
import { TAssignedStudent } from "../../../../utils/types/globalTypes";
import { FormEvent, useState } from "react";

interface IProps {
  data: TAssignedStudent;
}

const AdminAssignStudentUpdate = ({ data }: IProps) => {
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

  /**
   * Start Work
   */

  const {
    _id,
    studentId,
    studentName,
    studentEmail,
    studentPhone,
    courseId,
    batchId,
    coursePrice,
    courseDiscount,
    promoCodeStatus,
    promoCode,
    appliedpromoCode,
    promoPercent,
    finalPrice,
    paymentGateWay,
    status,
    transactionId,
    transactionMobileNumber,
    createdAt,
    updatedAt,
  } = data;

  const handleUpdateAssignStudent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="">
      <div onClick={showModal}>
        <button className="w-[30px] h-[30px] bg-green-500 text-white flex justify-center items-center rounded-md p-2">
          <Settings />
        </button>
      </div>
      <Modal
        title="Update Assign Student"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <div className="">
          <h1 className="font-bold text-xl">Update Assign Student</h1>
        </div>
      </Modal>
    </div>
  );
};

export default AdminAssignStudentUpdate;
