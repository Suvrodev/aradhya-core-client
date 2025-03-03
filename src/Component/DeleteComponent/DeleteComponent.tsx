import { Trash2 } from "lucide-react";

const DeleteComponent = () => {
  return (
    <div className="w-[30px] h-[30px] bg-red-500 text-white flex justify-center items-center rounded-md p-2">
      <Trash2 className="text-white font-bold" />
    </div>
  );
};

export default DeleteComponent;
