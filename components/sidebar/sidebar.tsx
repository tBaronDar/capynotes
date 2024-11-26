"use client";

import React from "react";
import NoteQueries from "./sidebar-item";

import styles from "./sidebar.module.css";
import { useNoteStore } from "@/data/store";
import { NotesMetaProps } from "@/data/types";

export default function Sidebar() {
	const notes = useNoteStore((state) => state.notes);

	//Types array
	const noteTypes: NotesMetaProps[] = [];

	notes.map((note) => {
		return noteTypes.push({
			metaData: note.type,
			noteId: note.id,
		});
	});

	//Subjects array
	const noteSubjects: NotesMetaProps[] = [];

	notes.map((note) => {
		return noteSubjects.push({ metaData: note.subject, noteId: note.id });
	});

	//if no notes...
	if (noteSubjects.length < 1 || noteTypes.length < 1) {
		return (
			<aside>
				<div></div>
			</aside>
		);
	}
	return (
		<aside className={styles.sidebar}>
			<NoteQueries
				title="Note Subjects"
				queryType={"subject"}
				data={noteSubjects}
			/>
			<NoteQueries title="Note Types" queryType={"type"} data={noteTypes} />
			{/* <NoteTypes title="Starred Notes" data={["Checklist", "Text"]} key={2} /> */}
		</aside>
	);
}
