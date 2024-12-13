import { Note, User } from "@prisma/client";

export interface NoteMutation extends Partial<Note> {
	isNewNote: boolean;
}

export interface NoteQuery {
	////
	subject?: string;
	type?: string;
}

export interface ArrayContent {
	isChecked: boolean;
	content: string;
}

//Stores
//Notes
export interface NotesStore {
	notes: Note[];
	setNotes: (input: Note[]) => void;

	checklistItems: ArrayContent[];
	setChecklistItems: (input: ArrayContent[]) => void;

	isEditing: boolean;
	setIsEditing: (input: boolean) => void;

	isAlert: boolean;
	setIsAlert: (input: boolean) => void;

	noteMutation: NoteMutation;
	setNoteMutation: (input: NoteMutation) => void;
}

//Users
export interface UserStore {
	userData: User | null;
	setUserData: (input: User) => void;
}

//Filter
export interface FilterStore {
	subjectFilter: string;
	typeFilter: string;
	setSubjectFilter: (input: string) => void;
	setTypeFilter: (input: string) => void;
}
