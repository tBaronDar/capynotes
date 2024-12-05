import { create } from "zustand";
import { NotesStore, UserStore } from "./types";

export const useNoteStore = create<NotesStore>((set) => ({
	notes: [],
	setNotes: (input) => set({ notes: input }),

	checklistItems: [],
	setChecklistItems: (input) => set(() => ({ checklistItems: input })),

	//makes the form appear
	isEditing: false,
	setIsEditing: (input) => set(() => ({ isEditing: input })),

	//makes alarm popup appear
	isAlert: false,
	setIsAlert: (input) => set({ isAlert: input }),

	//state of the input form
	noteMutation: {
		isNewNote: true,
		content: "",
	},
	setNoteMutation: (input) => set(() => ({ noteMutation: input })),

	noteQuery: { subject: undefined, type: undefined },
	setNoteQuery: (input) => set({ noteQuery: input }),
}));

export const useUserStore = create<UserStore>((set) => ({
	userData: null,
	setUserData: (input) => set(() => ({ userData: input })),
}));
