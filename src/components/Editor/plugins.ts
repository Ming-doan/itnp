import { NoteType } from "../../interfaces/Interface";
// Import Editors
import TextEditor from "./TextEditor";
import RichTextEditor from "./RichTextEditor";
import CodeEditor from "./CodeEditor";
// Import Icons
import {
  FileTextOutlined,
  FileMarkdownOutlined,
  CodeOutlined,
  // CheckSquareOutlined,
} from "@ant-design/icons";
// import TodoEditor from "./TodoEditor";

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
  // {
  //   type: NoteType.Todo,
  //   name: "Todo",
  //   editor: TodoEditor,
  //   icon: CheckSquareOutlined,
  //   initData: {
  //     todo: [],
  //   },
  // },
];

export default editorOptions;
