import { Note, User, Profile } from "@prisma/client";

export interface NoteTypesProps {
	title: string;
	list: string[];
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
	user: User;
	userProfile: Profile;
}
