// Enum for Note Type
enum NoteType {
  Text,
  RichText,
  Code,
  Todo,
}

interface Note {
  id: string;
  title: string;
  type: NoteType;
  data: any;
}

export { NoteType };
export type { Note };
