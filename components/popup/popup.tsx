"use client";
import React from "react";

import styles from "./popup.module.css";
import { useNoteStore } from "@/data/store";

export default function Popup() {
	const showAlert = useNoteStore((state) => state.isAlert);
	const setIsAlert = useNoteStore((state) => state.setIsAlert);

	if (!showAlert) {
		return;
	}

	return (
		<article className={styles.popup}>
			<h3>Title</h3>
			<p>There is something missing</p>
			<button
				onClick={() => {
					setIsAlert(false);
				}}>
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
		</article>
	);
}
