"use client";
import React, { useEffect } from "react";

import NoteItem from "./note-item";

import styles from "./note-list.module.css";
import { Note } from "@prisma/client";
import { useSession } from "next-auth/react";
import { trpc } from "@/app/_trpc/client";
import { useUserStore } from "@/data/store";
import { createId } from "@paralleldrive/cuid2";

export default function NoteList({
	initialData,
}: {
	initialData: Note[] | undefined;
}) {
	const trpcUtils = trpc.useUtils();
	const { data: sessionData } = useSession();
	const setUser = useUserStore((state) => state.setUserData);

	const createUser = trpc.createUser.useMutation({
		onSettled: () => {
			trpcUtils.getAllNotes.invalidate();
		},
	});

	let userId: string;

	if (sessionData?.user?.id) {
		userId = sessionData?.user?.id;
	} else {
		userId = createId();
	}
	const getUser = trpc.getUserData.useQuery({ id: userId });

	if (getUser.data && getUser) {
		setUser(getUser.data);
	} else {
		createUser.mutate({
			name: sessionData?.user?.name!,
			email: sessionData?.user?.email!,
			id: userId,
			profilePic: sessionData?.user?.image!,
		});
	}

	// console.log("get userdata", getUser.data);
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
