import { Modal } from "antd";
import { useState } from "react";
import { useAppSelector } from "../../../../redux/hook";
import { TBatch } from "../../../../utils/types/globalTypes";
import TextEditor from "../../../AdminDashboard/AdminBlog/TextEditor/TextEditor";
import { useUpdateBatchNoticeMutation } from "../../../../redux/api/features/Batch/batchManagementApi";
import { toast } from "sonner";
import { sonarId } from "../../../../utils/Fucntion/sonarId";

interface IProps {
  batchId: string;
}

const SendNotice = ({ batchId }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /**
   * Start Main Work
   */
  const [sendNotice] = useUpdateBatchNoticeMutation();
  const { batchs } = useAppSelector((state) => state.batchs);
  console.log("Batch id: ", batchId);
  console.log("batchs: ", batchs);

  const targetBatch = batchs?.find((batch: TBatch) => batch.batchId == batchId);
  console.log("Target batch: ", targetBatch);
  const [batchNotice, setBatchNotice] = useState<string>(
    targetBatch?.batchNotice as string
  );

  console.log("Batch notice: ", batchNotice);

  const handleUpdateNotice = async (batchId: string) => {
    console.log("Batch id: ", batchId);
    console.log("Batch notice: ", batchNotice);
    const updateData = { batchNotice: batchNotice };
    toast.loading("Sending notice", { id: sonarId });
    try {
      const res = await sendNotice({ id: batchId, updateData }).unwrap();
      console.log("Res: ", res);
      if (res?.status) {
        toast.success("Sent Notice", { id: sonarId });
      }
    } catch {
      alert("Something is going wrong to send notice");
    }
  };

  return (
    <div className="">
      <div onClick={showModal}>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
          Send Notice
        </button>
      </div>
      <Modal
        title="Send Notice"
        open={isModalOpen}
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
        <div>
          {/* <h1>Send Notice</h1> */}

          <TextEditor content={batchNotice} setContent={setBatchNotice} />
          <button
            onClick={() => handleUpdateNotice(batchId)}
            className="w-[146px] bg-purple-500 px-4 py-2 mt-4 rounded-md text-white"
          >
            Send Notice
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SendNotice;
