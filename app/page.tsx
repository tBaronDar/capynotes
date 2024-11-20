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
		// let userCheck = serverClient.createUser(undefined)
		user = {
			name: session.user.name || "",
			email: session.user.email || "",
			profilePic: session.user.image || null,
			id: session.user.id || createId(),
		};

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
