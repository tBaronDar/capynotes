import { serverClient } from "./_trpc/serverClient";
import MainNavigation from "@/components/navigation/main-navigation";

import styles from "./page.module.css";

import NoteList from "@/components/note-list/note-list";
import CreateNoteBtn from "@/components/controls/create-note";
import { auth } from "@/auth";
import Sidebar from "@/components/sidebar/sidebar";
import NewNote from "@/components/new-note/new-note";
import { Note, User } from "@prisma/client";

import { createId } from "@paralleldrive/cuid2";

export default async function HomePage() {
	const session = await auth();

	let user: User | undefined;
	let notes: Note[] | undefined;
	if (session?.user) {
		const sessionUser = {
			name: session.user.name || "",
			email: session.user.email || "",
			profilePic: session.user.image || "",
		};

		const userDb = await serverClient.getUserData({ email: sessionUser.email });

		if (userDb) {
			user = {
				name: userDb.name,
				email: userDb.email,
				profilePic: userDb.profilePic,
				id: userDb.id,
			};
		} else {
			user = {
				name: sessionUser.name,
				email: sessionUser.email,
				profilePic: sessionUser.profilePic,
				id: createId(),
			};
			serverClient.createUser({
				name: user.name,
				email: user.email,
				profilePic: user.profilePic || "",
				id: user.id,
			});
		}
		notes = await serverClient.getAllNotes();
	}
	// console.log(user);

	return (
		<main className={styles.main}>
			<MainNavigation />
			{session?.user && <NewNote />}

			{session?.user && <Sidebar />}

			{session?.user && <NoteList initialData={notes} userData={user} />}

			{!session?.user && (
				<div className={styles.auxilary}>
					<p>Login in to see notes...</p>
				</div>
			)}
			{session?.user && <CreateNoteBtn />}
		</main>
	);
}
