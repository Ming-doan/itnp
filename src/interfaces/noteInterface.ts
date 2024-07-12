enum NoteType {
  Text,
  RichText,
  Code,
  Todo
}

interface Note {
  id: string;
  title: string;
  type: NoteType;
  content: string;
}

export {NoteType}
export type {Note}