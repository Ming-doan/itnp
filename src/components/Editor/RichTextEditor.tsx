import React, { memo } from "react";
import { Input, Space } from "antd";
import ReactQuill from "react-quill";
import useDebounceState from "../../hooks/useDebounceState.ts";
import useStore from "../../context/appState";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditorTheme.css";

type RichTextEditorProps = {
  id: string;
  title: string;
  content: string;
};
const RichTextEditor: React.FC<RichTextEditorProps> = ({
  id,
  title,
  content,
}) => {
  const modifyTitle = useStore((state) => state.modifyTitle);
  const modifyContent = useStore((state) => state.modifyContent);
  const [localTitle, setLocalTitle] = useDebounceState(title, 500, (v) =>
    modifyTitle(id, v)
  );
  const [localContent, setLocalContent] = useDebounceState(content, 500, (v) =>
    modifyContent(id, v)
  );

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input
        placeholder="Title"
        variant="filled"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
      />
      <ReactQuill
        theme="snow"
        value={localContent}
        onChange={setLocalContent}
        style={{
          height: "300px",
        }}
      />
    </Space>
  );
};

export default memo(RichTextEditor);
