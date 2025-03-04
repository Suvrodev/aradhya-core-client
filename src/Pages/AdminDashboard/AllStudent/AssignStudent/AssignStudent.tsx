import { UserPlus } from "lucide-react";
import { Modal } from "antd";
import { FormEvent, useState } from "react";
import { TStudent } from "../../../../utils/types/globalTypes";

interface IProps {
  student: TStudent;
}
const AssignStudent = ({ student }: IProps) => {
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

  console.log("Student: ", student);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
  };
  return (
    <div className="">
      <div onClick={showModal}>
        <UserPlus />
      </div>
      <Modal
        title="Assign Student"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="form-container ">
          <h2 className="font-bold">Make Assign</h2>
          {/* Show the selected image */}

          <form onSubmit={handleSubmit} className="form">
            <button className="btn btn-primary text-white">Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AssignStudent;
