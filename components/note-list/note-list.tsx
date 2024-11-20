"use client";
import React, { useEffect } from "react";

import NoteItem from "./note-item";

import styles from "./note-list.module.css";
import { Note, User } from "@prisma/client";
import { useNoteStore, useUserStore } from "@/data/store";
import { trpc } from "@/app/_trpc/client";

export default function NoteList({
	initialData,
	userData,
}: {
	initialData: Note[] | undefined;
	userData: User | undefined;
}) {
	const setUser = useUserStore((state) => state.setUserData);
	const setNotes = useNoteStore((state) => state.setNotes);
	const notes = useNoteStore((state) => state.notes);

	const getUserDb = trpc.getUserData.useQuery({ id: userData!.id });
	const trpcUtils = trpc.useUtils();

	const createNewUser = trpc.createUser.useMutation({
		onSettled: () => trpcUtils.getAllNotes.invalidate(),
	});

	useEffect(() => {
		if (initialData && userData) {
			setNotes(initialData);

			if (getUserDb.data!.id === userData.id) {
				setUser(userData);
			} else {
				createNewUser.mutate({
					email: userData.email,
					name: userData.name,
					id: userData.id,
					profilePic: userData.profilePic!,
				});
				setUser(userData);
			}
		}
	}, [initialData, initialData]);

	// console.log("get userdata", getUser.data);
	return (
		<ul className={styles.list}>
			{notes.map((item) => (
				<li key={item.id}>
					<NoteItem data={item} />
				</li>
			))}
		</ul>
	);
}
