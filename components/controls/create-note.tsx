"use client";
import React, { useState } from "react";

import styles from "./create-note.module.css";
import { useNoteStore } from "@/data/store";
import { NoteType } from "@prisma/client";

export default function CreateNoteBtn() {
	const [isVisible, setIsVisible] = useState(false);
	const setIsEditing = useNoteStore((state) => state.setIsEditing);

	const setNoteMutation = useNoteStore((state) => state.setNoteMutation);
	const noteMutation = useNoteStore((state) => state.noteMutation);

	function newNoteHandler(noteType: NoteType) {
		setNoteMutation({
			...noteMutation,
			type: noteType,
			isNewNote: true,
		});
		setIsEditing(true);
		setIsVisible(!isVisible);
	}

	return (
		<div className={styles.container}>
			{/* main add button */}
			<button
				onClick={() => setIsVisible(!isVisible)}
				className={styles["new-button"]}>
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
						d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			</button>

			{/* New checklist note */}
			{isVisible && (
				<button
					onClick={newNoteHandler.bind(null, "CHECKLIST")}
					className={styles["sub-button"]}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className={styles["icon-sm"]}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
						/>
					</svg>
				</button>
			)}

			{/* New text note */}
			{isVisible && (
				<button
					onClick={newNoteHandler.bind(null, "TEXTNOTE")}
					className={styles["sub-button"]}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className={styles["icon-sm"]}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
						/>
					</svg>
				</button>
			)}
		</div>
	);
}
