"use client";
import React, { useEffect } from "react";

import NoteItem from "./note-item";

import styles from "./note-list.module.css";
import { User } from "@prisma/client";
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
	const setUser = useUserStore((state) => state.setUserData);
	const setNotes = useNoteStore((state) => state.setNotes);
	const notes = useNoteStore((state) => state.notes);

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

	// console.log("get userdata", getUser.data);
	if (notes.length < 1) {
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
			{notes.map((item) => (
				<li key={item.id}>
					<NoteItem note={item} />
				</li>
			))}
		</ul>
	);
}
