import styles from "./style.module.css";
import React, { useCallback } from "react";
import { Button, Input, Popconfirm, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Note } from "../../interfaces/NoteInterface.ts";
import useStore from "../../context/appState.ts";
import useDebounceState from "../../hooks/useDebounceState.ts";
import { mapNoteToEditorData } from "./mapper.tsx";
import customMemo from "../../utils/memo.ts";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import editorOptions from "./plugins";

type EditorByTypeProps = {
  note: Note;
};
const EditorByType: React.FC<EditorByTypeProps> = ({ note }) => {
  const updateTitle = useStore((state) => state.updateTitle);
  const [localTitle, setLocalTitle] = useDebounceState(note.title, 500, (v) =>
    updateTitle(note.id, v)
  );

  let editor = mapNoteToEditorData(note);
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input
        placeholder="Title"
        variant="filled"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
      />
      {editor}
    </Space>
  );
};

const EditorByTypeMemo = customMemo(EditorByType);

const ConvertFromNotesToItems = (notes: Note[]) => {
  const removeNote = useStore((state) => state.removeNote);
  const currentNoteId = useStore((state) => state.currentNoteId);
  const setCurrentNoteId = useStore((state) => state.setCurrentNoteId);
  const [_, setSearchParams] = useSearchParams({
    id: currentNoteId,
  } as URLSearchParamsInit);

  const handleRemoveNote = useCallback(
    (noteId: string) => {
      const noteIndex = notes.findIndex((note) => note.id === noteId);
      let newCurrentNoteId = null;

      if (noteId === currentNoteId) {
        if (notes.length === 1) {
          newCurrentNoteId = null; // No tabs left
        } else if (noteIndex === notes.length - 1) {
          newCurrentNoteId = notes[noteIndex - 1].id; // Move to previous tab
        } else {
          newCurrentNoteId = notes[noteIndex + 1].id; // Move to next tab
        }
      } else {
        newCurrentNoteId = currentNoteId as string;
      }

      removeNote(noteId);

      if (newCurrentNoteId !== null) {
        setCurrentNoteId(newCurrentNoteId);
        setSearchParams({ id: newCurrentNoteId });
      }
    },
    [notes, currentNoteId, removeNote, setCurrentNoteId]
  );

  return notes.map((note) => {
    const NoteIcon = editorOptions.find(
      (option) => option.type === note.type
    )?.icon;
    return {
      key: note.id,
      label: (
        <span className={styles.tabLabel}>
          {NoteIcon ? <NoteIcon /> : null}
          {note.title.slice(0, 20)}
          <Popconfirm
            title="Are you sure to delete this note?"
            onConfirm={(e) => {
              e?.stopPropagation();
              handleRemoveNote(note.id);
            }}
          >
            <Button
              size="small"
              type="text"
              icon={<CloseOutlined />}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Popconfirm>
        </span>
      ),
      children: <EditorByTypeMemo note={note} />,
    };
  });
};

export default ConvertFromNotesToItems;
