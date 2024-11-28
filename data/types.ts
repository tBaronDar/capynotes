import { Note, User } from "@prisma/client";

export interface NotesMetaProps {
	metaData: string;
	noteId: string;
}

export interface NoteMutation extends Partial<Note> {
	isNewNote: boolean;
}

export interface NoteQuery {
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

	isEditing: boolean;
	setIsEditing: (input: boolean) => void;

	noteMutation: NoteMutation;
	setNoteMutation: (input: NoteMutation) => void;

	noteQuery: NoteQuery | undefined;
	setNoteQuery: (input: NoteQuery) => void;
}

//Users
export interface UserStore {
	userData: User | null;
	setUserData: (input: User) => void;
}
