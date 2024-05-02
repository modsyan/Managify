import { useState } from "react";
import * as ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// customize quill react

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const allowedFormats = [
  "bold",
  "italic",
  "underline",
  "list",
  "header",
  "link",
];

export const Editor = () => {
  const [value, setValue] = useState("");

  // return ( // modsyan
    // <ReactQuill
    //   tabIndex={0}
    //   theme="snow"
    //   value={value}
    //   onChange={setValue}
    //   modules={{
    //     toolbar: toolbarOptions,
    //   }}
    //   formats={allowedFormats}
    //   style={{ height: "90vh" }}
    //   className="rounded-lg shadow-lg bg-gray-50 ring-[1px] ring-gray-300 outline-none flex flex-col justify-center mt-9 overflow-hidden text-center"
    // />
  // );
};
