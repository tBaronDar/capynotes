import React from "react";

import Note from "./note-item";

import styles from "./note-list.module.css";

export default function NoteList({ notes }: { notes: string[] }) {
	return (
		<ul className={styles.list}>
			{notes?.map((item) => (
				<li key={item}>
					<Note data={item} />
				</li>
			))}
		</ul>
	);
}
