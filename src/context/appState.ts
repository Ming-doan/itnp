import { create } from "zustand";
import type { Note } from "../interfaces/noteInterface";
import localStorage from "../providers/localStorage";

interface AppState {
  theme: string;
  setTheme: (theme: string) => void;
  currentNoteId: string | undefined;
  setCurrentNoteId: (id: string) => void;
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  modifyTitle: (id: string, title: string) => void;
  modifyContent: (id: string, content: string) => void;
}

const getTabIndex = () => {
  let index = localStorage.read("index", undefined) as string;
  if (!index) {
    index = (localStorage.read("data", []) as Note[])[0]?.id;
  }
  return index;
};

const useStore = create<AppState>((set) => ({
  theme: localStorage.read("theme", "light") as string,
  setTheme: (theme: string) => set({ theme }),
  currentNoteId: getTabIndex(),
  setCurrentNoteId: (id: string) => set({ currentNoteId: id }),
  notes: localStorage.read("data", []) as Note[],
  setNotes: (notes: Note[]) => set({ notes: notes }),
  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
  removeNote: (id: string) =>
    set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
  modifyTitle: (id: string, title: string) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, title: title } : note
      ),
    })),
  modifyContent: (id: string, content: string) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, content: content } : note
      ),
    })),
}));

export default useStore;
