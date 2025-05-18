import { useState } from "react";
import CustomTextEditor from "./CustomTextEditor";

const TiptapTextEditor = () => {
  const [content, setContent] = useState("<p>Start typing here...</p>");

  return (
    <div className="p-4">
      <CustomTextEditor content={content} setContent={setContent} />
      <div className="mt-4">
        <h3>HTML Output:</h3>
        <pre className="bg-gray-100 p-2 rounded overflow-auto">{content}</pre>
      </div>
    </div>
  );
};

export default TiptapTextEditor;
