import "./CodeEditorTheme.css";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { Select, Space } from "antd";
import useDebounceState from "../../../hooks/useDebounceState";
import useStore from "../../../context/appState";
import useSystemTheme from "../../../hooks/useSystemTheme";
import CodeEditorData from "../../../interfaces/CodeEditorInterface";
// Language Syntax
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { sql } from "@codemirror/lang-sql";
import { csharp } from "@replit/codemirror-lang-csharp";

const getExtensionByLanguage = (language: string) => {
  switch (language) {
    case "cpp":
      return cpp();
    case "html":
      return html();
    case "java":
      return java();
    case "json":
      return json();
    case "js":
      return javascript({ jsx: true, typescript: true });
    case "php":
      return php();
    case "py":
      return python();
    case "rs":
      return rust();
    case "sql":
      return sql();
    case "cs":
      return csharp();
    default:
      return javascript();
  }
};

type CodeEditorProps = {
  id: string;
  data: CodeEditorData;
};
const CodeEditor: React.FC<CodeEditorProps> = ({ id, data }) => {
  const theme = useStore((state) => state.theme);
  const updateData = useStore((state) => state.updateData);
  const [localLanguage, setLocalLanguage] = useDebounceState(
    data.language,
    500,
    (v) =>
      updateData(id, {
        language: v,
      })
  );
  const [localContent, setLocalContent] = useDebounceState(
    data.content,
    500,
    (v) =>
      updateData(id, {
        content: v,
      })
  );

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <CodeMirror
        value={localContent}
        onChange={(value) => setLocalContent(value)}
        height="55vh"
        theme={useSystemTheme(theme) === "dark" ? "dark" : "light"}
        extensions={[getExtensionByLanguage(localLanguage)]}
      />
      <Select
        value={localLanguage}
        onChange={setLocalLanguage}
        options={[
          { label: "C++", value: "cpp" },
          { label: "HTML", value: "html" },
          { label: "Java", value: "java" },
          { label: "JSON", value: "json" },
          { label: "JavaScript", value: "js" },
          { label: "PHP", value: "php" },
          { label: "Python", value: "py" },
          { label: "Rust", value: "rs" },
          { label: "SQL", value: "sql" },
          { label: "C#", value: "cs" },
        ]}
        style={{
          width: "10rem",
        }}
      />
    </Space>
  );
};

export default CodeEditor;
