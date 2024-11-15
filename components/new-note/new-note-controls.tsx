"use client";

import React from "react";

import styles from "./new-note-controls.module.css";
import { useNoteStore } from "@/data/store";

export default function NewNoteControls() {
	const setIsEditing = useNoteStore((state) => state.setIsEditing);
	return (
		<div className={styles.controls}>
			<button>
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
