import React from "react";
import ReactQuill from "react-quill";
import useDebounceState from "../../../hooks/useDebounceState.ts";
import useStore from "../../../context/appState.ts";
import RichTextEditorData from "../../../interfaces/RichTextEditorInterface.ts";
import "./RichTextEditorTheme.css";
import "react-quill/dist/quill.snow.css";

type RichTextEditorProps = {
  id: string;
  data: RichTextEditorData;
};
const RichTextEditor: React.FC<RichTextEditorProps> = ({ id, data }) => {
  const updateData = useStore((state) => state.updateData);
  const [localContent, setLocalContent] = useDebounceState(
    data.content,
    500,
    (v) =>
      updateData(id, {
        content: v,
      })
  );

  return (
    <ReactQuill
      theme="snow"
      value={localContent}
      onChange={setLocalContent}
      style={{
        height: "55vh",
      }}
    />
  );
};

export default RichTextEditor;
