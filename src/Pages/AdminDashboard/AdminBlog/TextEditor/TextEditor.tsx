import JoditEditor from "jodit-react";
// import { useRef } from "react";
// import { Editor } from "@tinymce/tinymce-react";

interface IProps {
  content: string;
  setContent: (value: string) => void;
}
const TextEditor = ({ content, setContent }: IProps) => {
  // const editorRef = useRef<Editor | null>(null);

  return (
    <div>
      <JoditEditor
        className="text-black"
        value={content}
        onChange={setContent}
      />
    </div>

    // <div>
    //   <Editor
    //     className="text-black"
    //     apiKey="jc3h78kjrffkxplen7kcrjykdi1ni2keaa8rtb0x4z4qmy85"
    //     onInit={(_evt: unknown, editor: Editor) => {
    //       editorRef.current = editor;
    //     }}
    //     value={content}
    //     onEditorChange={(newValue: string) => setContent(newValue)}
    //     init={{
    //       height: 500,
    //       menubar: true,
    //       plugins: [
    //         "anchor",
    //         "autolink",
    //         "charmap",
    //         "codesample",
    //         "emoticons",
    //         "image",
    //         "link",
    //         "lists",
    //         "media",
    //         "searchreplace",
    //         "table",
    //         "visualblocks",
    //         "wordcount",
    //         "checklist",
    //         "mediaembed",
    //         "casechange",
    //         "formatpainter",
    //         "pageembed",
    //         "a11ychecker",
    //         "tinymcespellchecker",
    //         "permanentpen",
    //         "powerpaste",
    //         "advtable",
    //         "advcode",
    //         "editimage",
    //         "advtemplate",
    //         "ai",
    //         "mentions",
    //         "tinycomments",
    //         "tableofcontents",
    //         "footnotes",
    //         "mergetags",
    //         "autocorrect",
    //         "typography",
    //         "inlinecss",
    //         "markdown",
    //         "importword",
    //         "exportword",
    //         "exportpdf",
    //       ],
    //       toolbar:
    //         "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | " +
    //         "link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | " +
    //         "align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
    //       tinycomments_mode: "embedded",
    //       tinycomments_author: "Author name",
    //       mergetags_list: [
    //         { value: "First.Name", title: "First Name" },
    //         { value: "Email", title: "Email" },
    //       ],
    //       content_style:
    //         "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color:#000000; }",
    //       ai_request: (
    //         _request: unknown,
    //         respondWith: {
    //           string: (fn: () => Promise<string>) => void;
    //         }
    //       ) =>
    //         respondWith.string(() =>
    //           Promise.reject("See docs to implement AI Assistant")
    //         ),
    //     }}
    //   />
    // </div>
  );
};

export default TextEditor;
