import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Note, NoteType } from "../../interfaces/NoteInterface";
import type { MenuProps } from "antd";
import editorOptions from "./plugins";

/**
 * Get the editor component based on the note type
 * @param note Note
 * @returns React.ReactNode
 */
export function mapNoteToEditorData(note: Note): React.ReactNode {
  const Editor = editorOptions.find(
    (option) => option.type === note.type
  )?.editor;
  if (!Editor) return null;
  return <Editor id={note.id} data={note.data} />;
}

/**
 * Get the initial data for a note based on the type
 * @param type NoteType
 * @returns Note
 */
export function getInitializeNoteData(type: NoteType): Note {
  // Get initial data, name based on the note type
  const option = editorOptions.find((option) => option.type === type);
  const initData = option?.initData || { content: "" };
  const name = option?.name || "New Note";

  const noteBaseData = {
    id: uuidv4(),
    title: `New ${name}`,
    type: type,
    data: initData,
  };
  return noteBaseData;
}

/**
 * Get the dropdown options for the note type
 * @param callback Function
 * @returns MenuProps["items"]
 */
export function getNoteTypeOptions(callback: Function): MenuProps["items"] {
  return editorOptions.map((option, index) => ({
    key: index.toString(),
    label: option.name,
    icon: <option.icon />,
    onClick: () => callback(option.type),
  }));
}
