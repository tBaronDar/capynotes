import { create } from "zustand";
import { NotesStore, UserStore } from "./types";
import { User } from "next-auth";

export const useNoteStore = create<NotesStore>((set) => ({
	notes: [],
	setNotes: (input) => set({ notes: input }),

	//makes the form appear
	isEditing: false,
	setIsEditing: (input) => set(() => ({ isEditing: input })),

	//state of the form
	noteMutation: {},
	setNoteMutation: (input) => set(() => ({ noteMutation: input })),

	noteQuery: { subject: undefined, type: undefined, test: "" },
	setNoteQuery: (input) => set({ noteQuery: input }),
}));

export const useUserStore = create<UserStore>((set) => ({
	userData: null,
	setUserData: (input) => set(() => ({ userData: input })),
}));
