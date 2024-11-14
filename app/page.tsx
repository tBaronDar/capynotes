import { serverClient } from "./_trpc/serverClient";
import MainNavigation from "@/components/navigation/main-navigation";

import styles from "./page.module.css";

import NoteList from "@/components/note-list/note-list";
import CreateNoteBtn from "@/components/controls/create-note";
import { auth } from "@/auth";
import Sidebar from "@/components/sidebar/sidebar";
import NewNote from "@/components/new-note/new-note";

export default async function HomePage() {
	const session = await auth();
	// const test = serverClient.test();
	return (
		<main className={styles.main}>
			<MainNavigation />
			{session?.user && <NewNote />}

			{session?.user && <Sidebar />}

			{session?.user && <NoteList notes={["ds", "dsd", "dsada"]} />}

			{!session?.user && (
				<div className={styles.auxilary}>
					<p>Login in to see notes...</p>
				</div>
			)}
			{session?.user && <CreateNoteBtn />}
		</main>
	);
}
