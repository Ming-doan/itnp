import "./CodeEditorTheme.css";
import React, { memo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { Input, Space, Select } from "antd";
import useDebounceState from "../../hooks/useDebounceState.ts";
import useStore from "../../context/appState";
import useSystemTheme from "../../hooks/useSystemTheme.ts";
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

const getLanguageAndContentString = (content: String) => {
  const match = content.match(/\[\w+\]/);
  if (match) {
    const lang = match[0];
    return [lang.slice(1, lang.length - 1), content.replace(lang, "")];
  }
  return [];
};

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
  title: string;
  content: string;
};
const CodeEditor: React.FC<CodeEditorProps> = ({ id, title, content }) => {
  const theme = useStore((state) => state.theme);
  const modifyTitle = useStore((state) => state.modifyTitle);
  const modifyContent = useStore((state) => state.modifyContent);

  const [_language, _content] = getLanguageAndContentString(content);

  const [language, setLanguage] = useState(_language);
  const [localTitle, setLocalTitle] = useDebounceState(title, 500, (v) =>
    modifyTitle(id, v)
  );
  const [localContent, setLocalContent] = useDebounceState(_content, 500, (v) =>
    modifyContent(id, `[${language}]${v}`)
  );

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input
        placeholder="Title"
        variant="filled"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
      />
      <CodeMirror
        value={localContent}
        onChange={(value) => setLocalContent(value)}
        height="300px"
        theme={useSystemTheme(theme) === "dark" ? "dark" : "light"}
        extensions={[getExtensionByLanguage(language)]}
      />
      <Select
        value={language}
        onChange={setLanguage}
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

export default memo(CodeEditor);
