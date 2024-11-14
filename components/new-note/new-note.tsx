"use client";

import React, { useEffect } from "react";
import { useStore } from "@/data/store";
import NewNoteControls from "./new-note-controls";

import styles from "./new-note.module.css";
import { NoteMutation } from "@/data/types";

export default function NewNote() {
	const isEditing = useStore((state) => state.isEditing);
	const setNewNote = useStore((state) => state.setNoteMutation);

	const newNote = useStore((state) => state.noteMutation);

	useEffect(() => {}, []);

	if (!isEditing) {
		return;
	}

	console.log(newNote);
	return (
		<article className={styles["new-note"]}>
			<div className={styles.headline}>
				<input
					placeholder="Title..."
					type="text"
					value={newNote?.title}
					onChange={(event) =>
						setNewNote({ ...newNote, title: event.currentTarget.value })
					}
				/>
				<input
					placeholder="Subject..."
					type="text"
					value={newNote?.subject}
					onChange={(event) =>
						setNewNote({ ...newNote, subject: event.currentTarget.value })
					}
				/>
				<input
					placeholder="Type..."
					type="text"
					value={newNote?.type}
					onChange={(event) =>
						setNewNote({ ...newNote, subject: event.currentTarget.value })
					}
				/>
			</div>
			<textarea rows={10} className={styles.content} />
			<NewNoteControls />
		</article>
	);
}
