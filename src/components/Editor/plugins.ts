import { NoteType } from "../../interfaces/NoteInterface";
// Import Editors
import TextEditor from "./TextEditor";
import RichTextEditor from "./RichTextEditor";
import CodeEditor from "./CodeEditor";
// Import Icons
import {
  FileTextOutlined,
  FileMarkdownOutlined,
  CodeOutlined,
} from "@ant-design/icons";

// Plugins for the Editor component
const editorOptions = [
  {
    type: NoteType.Text,
    name: "Text",
    editor: TextEditor,
    icon: FileTextOutlined,
    initData: {
      content: "",
    },
  },
  {
    type: NoteType.RichText,
    name: "Rich Text",
    editor: RichTextEditor,
    icon: FileMarkdownOutlined,
    initData: {
      content: "",
    },
  },
  {
    type: NoteType.Code,
    name: "Code",
    editor: CodeEditor,
    icon: CodeOutlined,
    initData: {
      content: "",
      language: "js",
    },
  },
];

export default editorOptions;
