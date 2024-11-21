"use client";

import React from "react";

import styles from "./new-note-controls.module.css";
import { useNoteStore, useUserStore } from "@/data/store";
import { trpc } from "@/app/_trpc/client";

export default function NewNoteControls() {
	const trpcUtils = trpc.useUtils();
	const setIsEditing = useNoteStore((state) => state.setIsEditing);
	const userData = useUserStore((state) => state.userData);

	const setNoteData = useNoteStore((state) => state.setNoteMutation);
	const noteInputData = useNoteStore((state) => state.noteMutation);

	const createNote = trpc.createNote.useMutation({
		onSettled: () => trpcUtils.getAllNotes.refetch(),
		onSuccess: () =>
			setNoteData({
				...noteInputData,
				title: "",
				content: "",
				subject: "",
			}),
	});

	const createNoteHandler = () => {
		if (userData && noteInputData) {
			const { title, subject, type, content } = noteInputData;
			const userId = userData.id;

			if (title && subject && type && content) {
				createNote.mutate({
					title,
					subject,
					type,
					content,
					authorId: userId,
				});
			}
		}
	};

	return (
		<div className={styles.controls}>
			<button onClick={createNoteHandler} disabled={createNote.isPending}>
				{/* save btn */}
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
						d="m4.5 12.75 6 6 9-13.5"
					/>
				</svg>
			</button>

			<button onClick={() => setIsEditing(false)}>
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
						d="M6 18 18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	);
}
