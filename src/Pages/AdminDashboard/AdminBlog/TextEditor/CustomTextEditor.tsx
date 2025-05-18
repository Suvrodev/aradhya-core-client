import React, { useState, useRef, useEffect } from "react";

interface IProps {
  content: string;
  setContent: (value: string) => void;
}

const CustomWordEditor = ({ content, setContent }: IProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [fontFamily, setFontFamily] = useState("Segoe UI");
  const [fontSize, setFontSize] = useState("14px");
  const [textColor, setTextColor] = useState("#242424");
  const [highlightColor, setHighlightColor] = useState("#FFFF00");
  const [textDirection, setTextDirection] = useState<"ltr" | "rtl">("ltr");
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    alignLeft: true,
    alignCenter: false,
    alignRight: false,
    bulletList: false,
    numberedList: false,
  });

  // Color palette
  const colors = {
    toolbarBg: "#f8f9fa",
    toolbarBorder: "#e0e0e0",
    buttonHover: "#e9ecef",
    buttonActive: "#dee2e6",
    editorBg: "#ffffff",
    editorBorder: "#e0e0e0",
    textPrimary: "#242424",
    textSecondary: "#495057",
    accentBlue: "#0d6efd",
    accentLightBlue: "#e7f1ff",
    borderLight: "#ced4da",
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.direction = "ltr";
      editorRef.current.style.textAlign = "left";
    }
  }, []);

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateContent();
    focusEditor();
    updateActiveFormats();
  };

  const insertTable = () => {
    const rows = prompt("Enter number of rows:", "3");
    const cols = prompt("Enter number of columns:", "3");
    if (rows && cols) {
      const tableHtml = generateTableHtml(parseInt(rows), parseInt(cols));
      document.execCommand("insertHTML", false, tableHtml);
      updateContent();
    }
    focusEditor();
  };

  const generateTableHtml = (rows: number, cols: number) => {
    let html =
      '<table border="1" style="width:100%;border-collapse:collapse;direction:ltr;">';
    for (let i = 0; i < rows; i++) {
      html += "<tr>";
      for (let j = 0; j < cols; j++) {
        html += `<td style="padding:8px;direction:ltr;">Cell ${i + 1},${
          j + 1
        }</td>`;
      }
      html += "</tr>";
    }
    html += "</table>";
    return html;
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");

    if (html && html.includes("urn:schemas-microsoft-com:office:word")) {
      const cleanHtml = cleanWordHtml(html);
      document.execCommand("insertHTML", false, cleanHtml);
    } else if (html) {
      document.execCommand("insertHTML", false, html);
    } else {
      document.execCommand("insertText", false, text);
    }
    updateContent();
    updateActiveFormats();
  };

  const cleanWordHtml = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const elements = tempDiv.querySelectorAll("*");
    elements.forEach((el) => {
      el.removeAttribute("class");

      if (el.hasAttribute("style")) {
        const style = el.getAttribute("style") || "";
        el.setAttribute(
          "style",
          style
            .replace(/\bmso-[^:;]+:[^;]+;?/g, "")
            .replace(/\s*font-family:[^;]+;?/gi, "")
            .replace(/\s*margin[^;]+;?/gi, "")
            .replace(/\s*text-indent:[^;]+;?/gi, "")
            .replace(/\s*line-height:[^;]+;?/gi, "")
            .replace(/\s*text-align:[^;]+;?/gi, "")
            .replace(/\s*direction:[^;]+;?/gi, "")
        );
      }

      el.setAttribute("dir", "ltr");
      el.style.direction = "ltr";
      el.style.textAlign = "left";
    });

    return tempDiv.innerHTML;
  };

  const updateContent = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const toggleTextDirection = () => {
    const newDirection = textDirection === "ltr" ? "rtl" : "ltr";
    setTextDirection(newDirection);
    if (editorRef.current) {
      editorRef.current.style.direction = newDirection;
      editorRef.current.style.textAlign =
        newDirection === "ltr" ? "left" : "right";
    }
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand("dir", false, newDirection);
    updateActiveFormats();
  };

  const updateActiveFormats = () => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const parentElement = range.commonAncestorContainer.parentElement;

    if (!parentElement) return;

    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      alignLeft:
        parentElement.style.textAlign === "left" ||
        (!parentElement.style.textAlign &&
          document.queryCommandState("justifyLeft")),
      alignCenter:
        parentElement.style.textAlign === "center" ||
        document.queryCommandState("justifyCenter"),
      alignRight:
        parentElement.style.textAlign === "right" ||
        document.queryCommandState("justifyRight"),
      bulletList:
        parentElement.tagName === "UL" ||
        document.queryCommandState("insertUnorderedList"),
      numberedList:
        parentElement.tagName === "OL" ||
        document.queryCommandState("insertOrderedList"),
    });
  };

  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.innerHTML = content;
      editorRef.current.style.direction = "ltr";
      editorRef.current.style.textAlign = "left";
    }
  }, [content]);

  // Destructure active formats for easier access
  const {
    bold: isBoldActive,
    italic: isItalicActive,
    underline: isUnderlineActive,
    alignLeft: isAlignLeftActive,
    alignCenter: isAlignCenterActive,
    alignRight: isAlignRightActive,
    bulletList: isBulletListActive,
    numberedList: isNumberedListActive,
  } = activeFormats;

  return (
    <div
      className="max-w-4xl mx-auto border rounded-lg overflow-hidden shadow-sm"
      style={{ borderColor: colors.editorBorder }}
    >
      {/* Toolbar */}
      <div
        className="p-2 border-b flex flex-wrap gap-2 items-center"
        style={{
          backgroundColor: colors.toolbarBg,
          borderColor: colors.toolbarBorder,
        }}
      >
        {/* Text Direction Toggle */}
        <button
          onClick={toggleTextDirection}
          className="px-3 py-1 rounded-md flex items-center gap-1 transition-all"
          style={{
            color: colors.textPrimary,
            backgroundColor:
              textDirection === "ltr" ? colors.accentLightBlue : "transparent",
            border: `1px solid ${colors.borderLight}`,
          }}
          title="Toggle Text Direction"
        >
          <span
            style={{
              color:
                textDirection === "ltr"
                  ? colors.accentBlue
                  : colors.textSecondary,
            }}
          >
            {textDirection === "ltr" ? "LTR →" : "← RTL"}
          </span>
        </button>

        {/* Font Family Selector */}
        <div
          className="flex items-center gap-1 rounded-md border px-2 py-1 bg-white"
          style={{ borderColor: colors.borderLight }}
        >
          <label
            htmlFor="fontFamily"
            className="text-sm"
            style={{ color: colors.textSecondary }}
          >
            Font:
          </label>
          <select
            id="fontFamily"
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
              formatText("fontName", e.target.value);
            }}
            className="border-none focus:outline-none cursor-pointer"
            style={{ color: colors.textPrimary }}
          >
            <option value="Segoe UI">Segoe UI</option>
            <option value="Calibri">Calibri</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>

        {/* Font Size Selector */}
        <div
          className="flex items-center gap-1 rounded-md border px-2 py-1 bg-white"
          style={{ borderColor: colors.borderLight }}
        >
          <label
            htmlFor="fontSize"
            className="text-sm"
            style={{ color: colors.textSecondary }}
          >
            Size:
          </label>
          <select
            id="fontSize"
            value={fontSize}
            onChange={(e) => {
              setFontSize(e.target.value);
              formatText("fontSize", e.target.value.replace("px", ""));
            }}
            className="border-none focus:outline-none cursor-pointer"
            style={{ color: colors.textPrimary }}
          >
            <option value="11px">11</option>
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="18px">18</option>
            <option value="24px">24</option>
          </select>
        </div>

        {/* Formatting Buttons Group */}
        <div
          className="flex rounded-md border overflow-hidden"
          style={{ borderColor: colors.borderLight }}
        >
          <button
            onClick={() => formatText("bold")}
            className="px-3 py-1 transition-all hover:bg-gray-100"
            style={{
              color: isBoldActive ? colors.accentBlue : colors.textPrimary,
              backgroundColor: isBoldActive
                ? colors.buttonActive
                : "transparent",
            }}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => formatText("italic")}
            className="px-3 py-1 transition-all hover:bg-gray-100 border-l"
            style={{
              color: isItalicActive ? colors.accentBlue : colors.textPrimary,
              backgroundColor: isItalicActive
                ? colors.buttonActive
                : "transparent",
              borderColor: colors.borderLight,
            }}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => formatText("underline")}
            className="px-3 py-1 transition-all hover:bg-gray-100 border-l"
            style={{
              color: isUnderlineActive ? colors.accentBlue : colors.textPrimary,
              backgroundColor: isUnderlineActive
                ? colors.buttonActive
                : "transparent",
              borderColor: colors.borderLight,
            }}
            title="Underline"
          >
            <u>U</u>
          </button>
        </div>

        {/* Color Pickers Group */}
        <div
          className="flex gap-2 items-center rounded-md border px-2 py-1 bg-white"
          style={{ borderColor: colors.borderLight }}
        >
          <div className="flex items-center gap-1">
            <label
              htmlFor="textColor"
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              Text:
            </label>
            <div className="relative">
              <input
                type="color"
                id="textColor"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  formatText("foreColor", e.target.value);
                }}
                className="w-6 h-6 cursor-pointer opacity-0 absolute"
              />
              <div
                className="w-6 h-6 rounded border"
                style={{
                  backgroundColor: textColor,
                  borderColor: colors.borderLight,
                }}
              ></div>
            </div>
          </div>

          <div className="h-4 w-px bg-gray-300"></div>

          <div className="flex items-center gap-1">
            <label
              htmlFor="highlightColor"
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              Highlight:
            </label>
            <div className="relative">
              <input
                type="color"
                id="highlightColor"
                value={highlightColor}
                onChange={(e) => {
                  setHighlightColor(e.target.value);
                  formatText("hiliteColor", e.target.value);
                }}
                className="w-6 h-6 cursor-pointer opacity-0 absolute"
              />
              <div
                className="w-6 h-6 rounded border"
                style={{
                  backgroundColor: highlightColor,
                  borderColor: colors.borderLight,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Alignment Buttons Group */}
        <div
          className="flex rounded-md border overflow-hidden"
          style={{ borderColor: colors.borderLight }}
        >
          <button
            onClick={() => formatText("justifyLeft")}
            className="px-3 py-1 transition-all hover:bg-gray-100"
            style={{
              color: isAlignLeftActive ? colors.accentBlue : colors.textPrimary,
              backgroundColor: isAlignLeftActive
                ? colors.buttonActive
                : "transparent",
            }}
            title="Align Left"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            onClick={() => formatText("justifyCenter")}
            className="px-3 py-1 transition-all hover:bg-gray-100 border-l"
            style={{
              color: isAlignCenterActive
                ? colors.accentBlue
                : colors.textPrimary,
              backgroundColor: isAlignCenterActive
                ? colors.buttonActive
                : "transparent",
              borderColor: colors.borderLight,
            }}
            title="Align Center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M21 6H3m14 6H7m12 6H5"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            onClick={() => formatText("justifyRight")}
            className="px-3 py-1 transition-all hover:bg-gray-100 border-l"
            style={{
              color: isAlignRightActive
                ? colors.accentBlue
                : colors.textPrimary,
              backgroundColor: isAlignRightActive
                ? colors.buttonActive
                : "transparent",
              borderColor: colors.borderLight,
            }}
            title="Align Right"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M21 6H3m18 6H9m12 6H7"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* List Buttons Group */}
        <div
          className="flex rounded-md border overflow-hidden"
          style={{ borderColor: colors.borderLight }}
        >
          <button
            onClick={() => formatText("insertUnorderedList")}
            className="px-3 py-1 transition-all hover:bg-gray-100"
            style={{
              color: isBulletListActive
                ? colors.accentBlue
                : colors.textPrimary,
              backgroundColor: isBulletListActive
                ? colors.buttonActive
                : "transparent",
            }}
            title="Bullet List"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="5" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="19" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </button>
          <button
            onClick={() => formatText("insertOrderedList")}
            className="px-3 py-1 transition-all hover:bg-gray-100 border-l"
            style={{
              color: isNumberedListActive
                ? colors.accentBlue
                : colors.textPrimary,
              backgroundColor: isNumberedListActive
                ? colors.buttonActive
                : "transparent",
              borderColor: colors.borderLight,
            }}
            title="Numbered List"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18h-2v-4h2v4"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Table Button */}
        <button
          onClick={insertTable}
          className="px-3 py-1 rounded-md transition-all hover:bg-gray-100 border flex items-center gap-1"
          style={{
            color: colors.textPrimary,
            borderColor: colors.borderLight,
          }}
          title="Insert Table"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect x="3" y="3" width="18" height="18" rx="1" strokeWidth="2" />
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeWidth="2" />
          </svg>
          <span>Table</span>
        </button>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onPaste={handlePaste}
        onInput={updateContent}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        className={`min-h-[500px] p-6 ${isFocused ? "outline-none" : ""}`}
        style={{
          fontFamily,
          fontSize,
          color: textColor,
          backgroundColor: colors.editorBg,
          direction: textDirection,
          textAlign: textDirection === "ltr" ? "left" : "right",
          lineHeight: "1.5",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default CustomWordEditor;
