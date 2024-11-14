import { create } from "zustand";
import { NotesStore } from "./types";

export const useStore = create<NotesStore>((set) => ({
	notes: [],
	setNotes: (input) => set({ notes: input }),

	isEditing: false,
	setIsEditing: (input) => set(() => ({ isEditing: input })),

	noteMutation: undefined,
	setNoteMutation: (input) => set(() => ({ noteMutation: input })),
}));
