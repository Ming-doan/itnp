import { create } from "zustand";
import type { Note } from "../interfaces/Interface";
import storage from "../providers";

interface AppState {
  theme: string;
  setTheme: (theme: string) => void;
  currentNoteId: string | undefined;
  setCurrentNoteId: (id: string) => void;
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateTitle: (id: string, title: string) => void;
  updateData: (id: string, data: object) => void;
}

const getTabIndex = () => {
  let index = storage.read("index", undefined) as string;
  if (!index) {
    index = (storage.read("data", []) as Note[])[0]?.id;
  }
  return index;
};

const useStore = create<AppState>((set) => ({
  theme: storage.read("theme", "light") as string,
  setTheme: (theme: string) => set({ theme }),
  currentNoteId: getTabIndex(),
  setCurrentNoteId: (id: string) => set({ currentNoteId: id }),
  notes: storage.read("data", []) as Note[],
  setNotes: (notes: Note[]) => set({ notes: notes }),
  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
  removeNote: (id: string) =>
    set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
  updateTitle: (id: string, title: string) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, title: title } : note
      ),
    })),
  updateData: (id: string, data: object) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, data: { ...note.data, ...data } } : note
      ),
    })),
}));

export default useStore;
