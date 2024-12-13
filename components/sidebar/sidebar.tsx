"use client";

import React from "react";
import NoteQueries from "./sidebar-item";

import styles from "./sidebar.module.css";
import { useNoteStore } from "@/data/store";
import { NotesMetaProps } from "@/data/types";

export default function Sidebar() {
	const notes = useNoteStore((state) => state.notes);

	const typesSet = new Set<string>();
	const subjectsSet = new Set<string>();

	notes.forEach((note) => {
		typesSet.add(note.type);
		subjectsSet.add(note.subject);
	});

	const subjectsArray = Array.from(subjectsSet);
	const typesArray = Array.from(typesSet);

	//if no notes...
	if (subjectsArray.length < 1 || typesArray.length < 1) {
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
				data={subjectsArray}
			/>
			<NoteQueries title="Note Types" queryType={"type"} data={typesArray} />
			{/* <NoteTypes title="Starred Notes" data={["Checklist", "Text"]} key={2} /> */}
		</aside>
	);
}
