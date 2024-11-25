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
		onSuccess: () => {
			setNoteData({
				...noteInputData,
				title: "",
				content: "",
				subject: "",
			});
			setIsEditing(false);
		},
	});

	const updateNote = trpc.updateNote.useMutation({
		onSettled: () => trpcUtils.getAllNotes.refetch(),
		onSuccess: () => {
			setNoteData({
				...noteInputData,
				title: "",
				content: "",
				subject: "",
			});
			setIsEditing(false);
		},
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

	const editNoteHandler = () => {
		if (noteInputData) {
			const { title, subject, content, id } = noteInputData;

			if (title && subject && content && id) {
				updateNote.mutate({
					id,
					content,
					subject,
					title,
				});
			}
		}
	};

	const cancelNoteHandler = () => {
		setNoteData({
			...noteInputData,
			title: "",
			content: "",
			subject: "",
		});
		setIsEditing(false);
	};

	return (
		<div className={styles.controls}>
			{!noteInputData.isNewNote && (
				<button onClick={editNoteHandler} disabled={updateNote.isPending}>
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
							d="m4.5 12.75 6 6 9-13.5"
						/>
					</svg>
				</button>
			)}

			{noteInputData.isNewNote && (
				<button onClick={createNoteHandler} disabled={createNote.isPending}>
					{/* create btn */}
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
			)}

			<button onClick={cancelNoteHandler}>
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
