import { serverClient } from "./_trpc/serverClient";
import MainNavigation from "@/components/navigation/main-navigation";

import styles from "./page.module.css";
import NoteTypes from "@/components/note-options/note-options";
import NoteList from "@/components/note-list/note-list";
import CreateNoteBtn from "@/components/controls/create-note";

export default function HomePage() {
	// const test = serverClient.test();
	return (
		<main className={styles.main}>
			<MainNavigation />

			<aside>
				<NoteTypes
					title="Note Subjects"
					list={["Shopping", "Christmas deco", "party stuff"]}
				/>
				<NoteTypes title="Note Types" list={["Checklist", "Text"]} />
				<NoteTypes title="Starred Notes" list={["Checklist", "Text"]} />
			</aside>
			<NoteList notes={["ds", "dsd", "dsada"]} />
			<CreateNoteBtn />
		</main>
	);
}
