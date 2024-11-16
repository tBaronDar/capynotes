"use client";

import React from "react";

import styles from "./new-note-controls.module.css";
import { useNoteStore } from "@/data/store";
import { trpc } from "@/app/_trpc/client";
import { useSession } from "next-auth/react";

export default function NewNoteControls() {
	const trpcUtils = trpc.useUtils();
	const setIsEditing = useNoteStore((state) => state.setIsEditing);
	const noteInputData = useNoteStore((state) => state.noteMutation);

	const createNote = trpc.createNote.useMutation({
		onSettled: () => trpcUtils.getAllNotes.invalidate(),
	});

	const { data: sessionData } = useSession();

	const createNoteHandler = () => {
		if (sessionData?.user) {
			createNote.mutate({
				title: noteInputData?.title!,
				subject: noteInputData?.subject!,
				type: noteInputData?.type!,
				content: noteInputData?.content!,
				authorId: sessionData?.user?.id!,
			});
		}
	};

	return (
		<div className={styles.controls}>
			<button onClick={createNoteHandler}>
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
