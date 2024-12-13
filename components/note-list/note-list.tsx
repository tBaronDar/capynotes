"use client";
import React, { useEffect } from "react";

import NoteItem from "./note-item";
import { useFilterStore, useNoteStore, useUserStore } from "@/data/store";
import { User } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";

import styles from "./note-list.module.css";

export default function NoteList({
	initialNotes,
	userData,
}: {
	initialNotes: Awaited<ReturnType<(typeof serverClient)["getAllNotes"]>>;
	userData: User | undefined;
}) {
	//const [notesToShow, setNotesToShow] = useState<Note[]>([]);
	const setUser = useUserStore((state) => state.setUserData);

	const setNotes = useNoteStore((state) => state.setNotes);
	const notes = useNoteStore((state) => state.notes);

	const subjectFilter = useFilterStore((state) => state.subjectFilter);
	const typeFilter = useFilterStore((state) => state.typeFilter);

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
	}, [notesDb, userData]);
	//filter notes according to aside input
	const filteredNotes = notes.filter((note) => {
		const matchesType = typeFilter === "CHECKLIST" || "TEXTNOTE" || "";
		const matchesSubject =
			subjectFilter === note.subject || subjectFilter === "";

		return matchesType && matchesSubject;
	});

	//newer fist
	filteredNotes.sort((a, b) => {
		const dateA = new Date(a.updatedAt).getTime();
		const dateB = new Date(b.updatedAt).getTime();
		return dateB - dateA;
	});

	if (filteredNotes.length < 1) {
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
			{filteredNotes.map((item) => (
				<li key={item.id}>
					<NoteItem note={item} />
				</li>
			))}
		</ul>
	);
}
