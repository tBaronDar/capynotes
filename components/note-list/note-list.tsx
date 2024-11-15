"use client";
import React, { useEffect } from "react";

import NoteItem from "./note-item";

import styles from "./note-list.module.css";
import { Note } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function NoteList({
	initialData,
}: {
	initialData: Note[] | undefined;
}) {
	const { data: sessionData } = useSession();

	useEffect(() => {}, []);
	return (
		<ul className={styles.list}>
			{initialData?.map((item) => (
				<li key={item.id}>
					<NoteItem data={item} />
				</li>
			))}
		</ul>
	);
}
