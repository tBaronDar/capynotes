import { create } from "zustand";
import { NotesStore, UserStore } from "./types";
import { User } from "next-auth";

export const useNoteStore = create<NotesStore>((set) => ({
	notes: [],
	setNotes: (input) => set({ notes: input }),

	isEditing: false,
	setIsEditing: (input) => set(() => ({ isEditing: input })),

	noteMutation: undefined,
	setNoteMutation: (input) => set(() => ({ noteMutation: input })),
}));

export const useUserStore = create<UserStore>((set) => ({
	userData: null,
	setUserData: (input) => set(() => ({ userData: input })),
}));
