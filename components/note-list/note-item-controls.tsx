"use client";

import React from "react";

import styles from "./note-item-controls.module.css";
import { trpc } from "@/app/_trpc/client";
import { useNoteStore } from "@/data/store";
import { Note } from "@prisma/client";

export default function ItemControls({ note }: { note: Note }) {
	const setIsEditing = useNoteStore((state) => state.setIsEditing);

	const setNoteMutation = useNoteStore((state) => state.setNoteMutation);
	const noteMutation = useNoteStore((state) => state.noteMutation);

	const trpcUtils = trpc.useUtils();
	const deleteNote = trpc.deleteNote.useMutation({
		onSuccess: () => trpcUtils.getAllNotes.refetch(),
	});

	const deleteNoteHandler = () => {
		//ask before deletion
		const confirmation = window.confirm(
			"Are you sure you want to delete this note?"
		);

		if (confirmation) {
			deleteNote.mutate({ noteId: note.id });
		}
	};

	const editNoteHandler = () => {
		setNoteMutation({
			...noteMutation,
			title: note.title,
			subject: note.subject,
			content: note.content,
			type: note.type,
			id: note.id,
			isNewNote: false,
		});
		setIsEditing(true);
	};

	return (
		<div className={styles.controls}>
			<button onClick={editNoteHandler}>
				{/* edit btn */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className={styles.icon}>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
					/>
				</svg>
			</button>

			<button>
				{/* btn fullscreen */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className={styles.icon}>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
					/>
				</svg>
			</button>

			<button onClick={deleteNoteHandler}>
				{/* btn delete  */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className={styles.icon}>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
					/>
				</svg>
			</button>
		</div>
	);
}
