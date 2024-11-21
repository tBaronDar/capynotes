"use client";

import React from "react";
import NoteTypes from "./sidebar-item";

import styles from "./sidebar.module.css";
import { useNoteStore } from "@/data/store";
import { NotesMetaProps } from "@/data/types";

export default function Sidebar() {
	const notes = useNoteStore((state) => state.notes);

	//Types array
	const noteTypes: NotesMetaProps[] = [];

	notes.map((note) => {
		return noteTypes.push({ metaData: note.type, noteId: note.id });
	});

	//Subjects array
	const noteSubjects: NotesMetaProps[] = [];

	notes.map((note) => {
		return noteSubjects.push({ metaData: note.subject, noteId: note.id });
	});

	if (noteSubjects.length < 1 || noteTypes.length < 1) {
		console.log("daddsa");
		return (
			<aside>
				<div></div>
			</aside>
		);
	}
	return (
		<aside className={styles.sidebar}>
			<NoteTypes title="Note Subjects" data={noteSubjects} key={1} />
			{/* <NoteTypes title="Note Types" list={noteTypes} /> */}
			{/* <NoteTypes title="Starred Notes" data={["Checklist", "Text"]} key={2} /> */}
		</aside>
	);
}
