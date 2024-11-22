"use client";
import React, { useEffect, useState } from "react";

import NoteItem from "./note-item";

import styles from "./note-list.module.css";
import { Note, User } from "@prisma/client";
import { useNoteStore, useUserStore } from "@/data/store";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";

export default function NoteList({
	initialNotes,
	userData,
}: {
	initialNotes: Awaited<ReturnType<(typeof serverClient)["getAllNotes"]>>;
	userData: User | undefined;
}) {
	const [notesToShow, setNotesToShow] = useState<Note[]>([]);

	const setUser = useUserStore((state) => state.setUserData);
	const setNotes = useNoteStore((state) => state.setNotes);
	const notes = useNoteStore((state) => state.notes);
	const queryTerm = useNoteStore((state) => state.noteQuery);

	const getNotes = trpc.getAllNotes.useQuery(
		{ authorId: userData?.id! },
		{ initialData: initialNotes }
	);

	const notesDb = getNotes.data;

	useEffect(() => {
		setNotes(notesDb);
		setUser({
			name: userData?.name!,
			email: userData?.email!,
			id: userData?.id!,
			profilePic: userData?.profilePic!,
		});

		//filter notes according to aside input
		if (queryTerm) {
			const { subject, type } = queryTerm;

			let arrayHelper1;
			if (subject) {
				arrayHelper1 = notesDb.filter((note) => subject === note.subject);
			} else {
				arrayHelper1 = notesDb;
			}

			let arrayHelper2;
			if (type && arrayHelper1) {
				arrayHelper2 = arrayHelper1.filter((note) => type === note.type);
			} else {
				arrayHelper2 = arrayHelper1;
			}
			setNotesToShow(arrayHelper2 || notesDb);
		}
	}, [notesDb, userData, queryTerm]);

	// console.log("get userdata", getUser.data);
	if (notesToShow.length < 1) {
		return (
			<ul className={styles["empty-list"]}>
				<li>
					<p>No Notes to show</p>
				</li>
			</ul>
		);
	}
	return (
		<ul className={styles.list}>
			{notesToShow.map((item) => (
				<li key={item.id}>
					<NoteItem note={item} />
				</li>
			))}
		</ul>
	);
}
