import React from "react";

import styles from "./note-item.module.css";
import ItemControls from "./note-item-controls";
import { Note } from "@prisma/client";

export default function NoteItem({ note }: { note: Note }) {
	return (
		<article className={styles.note}>
			<div className={styles.headline}>
				<p>{note.title}</p>
				<p>{note.subject}</p>
			</div>
			<p className={styles["note-text"]}>{note.content}</p>
			<ItemControls />
		</article>
	);
}
