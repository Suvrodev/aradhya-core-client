import JoditEditor from "jodit-react";

interface IProps {
  content: string;
  setContent: (value: string) => void;
}
const TextEditor = ({ content, setContent }: IProps) => {
  return (
    <div>
      <JoditEditor
        className="text-black"
        value={content}
        onChange={setContent}
      />
    </div>
  );
};

export default TextEditor;
