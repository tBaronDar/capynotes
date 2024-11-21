import { Note, User } from "@prisma/client";

export interface NotesMetaProps {
	metaData: string;
	noteId: string;
}

export interface NoteMutation extends Partial<Note> {}

//Stores
//Notes
export interface NotesStore {
	notes: Note[];
	setNotes: (input: Note[]) => void;

	isEditing: boolean;
	setIsEditing: (input: boolean) => void;

	noteMutation: NoteMutation | undefined;
	setNoteMutation: (input: NoteMutation) => void;
}

//Users
export interface UserStore {
	userData: User | null;
	setUserData: (input: User) => void;
}
