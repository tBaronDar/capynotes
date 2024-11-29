import React from "react";

import styles from "./note-item.module.css";
import ItemControls from "./note-item-controls";
import { Note } from "@prisma/client";
import { useNoteStore } from "@/data/store";
import { ArrayContent } from "@/data/types";

export default function NoteItem({ note }: { note: Note }) {
	const inputArray = note.content!.split("[/]");

	let arrayContentHelper: ArrayContent[] = [];

	inputArray.forEach((item) => {
		if (item !== "") {
			arrayContentHelper.push({
				isChecked: item.startsWith("1"),
				content: item.substring(1),
			});
		}
	});

	return (
		<article className={styles.note}>
			<div className={styles.headline}>
				<p>{note.title}</p>
				<p>{note.subject}</p>
			</div>
			{note.type === "TEXTNOTE" && (
				<p className={styles["note-text"]}>{note.content}</p>
			)}
			{note.type === "CHECKLIST" &&
				arrayContentHelper.map((item) => (
					<div key={item.content} className={styles["checklist-item"]}>
						<input type="checkbox" readOnly checked={item.isChecked} />
						<p>{item.content}</p>
					</div>
				))}
			<ItemControls note={note} />
		</article>
	);
}
