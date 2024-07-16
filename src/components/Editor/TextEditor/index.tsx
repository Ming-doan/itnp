import React from "react";
import { Input } from "antd";
import useDebounceState from "../../../hooks/useDebounceState.ts";
import useStore from "../../../context/appState.ts";
import TextEditorData from "../../../interfaces/TextEditorInterface.ts";

type TextEditorProps = {
  id: string;
  data: TextEditorData;
};
const TextEditor: React.FC<TextEditorProps> = ({ id, data }) => {
  const updateData = useStore((state) => state.updateData);
  const [localContent, setLocalContent] = useDebounceState(
    data.content,
    2000,
    (v) =>
      updateData(id, {
        content: v,
      })
  );

  return (
    <Input.TextArea
      showCount
      placeholder="Your note here"
      style={{
        height: "55vh",
      }}
      value={localContent}
      onChange={(e) => setLocalContent(e.target.value)}
    />
  );
};

export default TextEditor;
