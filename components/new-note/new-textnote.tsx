"use client";

import React from "react";
import { useNoteStore } from "@/data/store";
import NewNoteControls from "./new-note-controls";

import styles from "./new-textnote.module.css";

export default function NewTextnote() {
	const isEditing = useNoteStore((state) => state.isEditing);
	const setNewNote = useNoteStore((state) => state.setNoteMutation);

	const newNote = useNoteStore((state) => state.noteMutation);

	if (!isEditing) {
		return;
	}

	if (newNote.type === "TEXTNOTE") {
		return (
			<article className={styles["new-note"]}>
				<div className={styles.headline}>
					<input
						placeholder="Title..."
						type="text"
						value={newNote?.title || ""}
						onChange={(event) =>
							setNewNote({ ...newNote, title: event.currentTarget.value })
						}
					/>
					<input
						placeholder="Subject..."
						type="text"
						value={newNote?.subject || ""}
						onChange={(event) =>
							setNewNote({ ...newNote, subject: event.currentTarget.value })
						}
					/>
					<p className={styles.type}>{newNote?.type}</p>
				</div>
				<textarea
					rows={10}
					className={styles.content}
					value={newNote?.content || ""}
					onChange={(event) =>
						setNewNote({ ...newNote, content: event.currentTarget.value })
					}
				/>
				<NewNoteControls />
			</article>
		);
	}
}
