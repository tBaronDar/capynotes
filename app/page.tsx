import { serverClient } from "./_trpc/serverClient";
import MainNavigation from "@/components/navigation/main-navigation";

import styles from "./page.module.css";

import NoteList from "@/components/note-list/note-list";
import CreateNoteBtn from "@/components/controls/create-note";
import { auth } from "@/auth";
import Sidebar from "@/components/sidebar/sidebar";
import NewTextnote from "@/components/new-note/new-textnote";
import { User } from "@prisma/client";

import { createId } from "@paralleldrive/cuid2";
import NewChecklist from "@/components/new-note/new-checklist";
import AuthControls from "@/components/auth/controls";
import Popup from "@/components/popup/popup";

export default async function HomePage() {
	const session = await auth();

	if (!session) {
		return (
			<main className={styles.main}>
				<MainNavigation />
				<div className={styles.auxilary}>
					<p>Login in to see notes...</p>
					<AuthControls />
				</div>
			</main>
		);
	}

	const sessionUser = {
		name: session.user?.name || "",
		email: session.user?.email || "",
		profilePic: session.user?.image || "",
	};

	const userDb = await serverClient.getUserData({ email: sessionUser.email });

	let user: User;

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
	const notes = await serverClient.getAllNotes({ authorId: user.id });

	// console.log(user);

	return (
		<main className={styles.main}>
			<MainNavigation />
			{session?.user && <NewTextnote />}
			{session?.user && <NewChecklist />}

			{session?.user && <Sidebar />}

			{session?.user && <NoteList initialNotes={notes} userData={user} />}

			{session?.user && <CreateNoteBtn />}
			<Popup />
		</main>
	);
}
