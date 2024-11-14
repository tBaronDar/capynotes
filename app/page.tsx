import { serverClient } from "./_trpc/serverClient";
import MainNavigation from "@/components/navigation/main-navigation";

import styles from "./page.module.css";

import NoteList from "@/components/note-list/note-list";
import CreateNoteBtn from "@/components/controls/create-note";
import { auth } from "@/auth";
import Sidebar from "@/components/sidebar/sidebar";
import NewNote from "@/components/new-note/new-note";
import { Note } from "@prisma/client";

export default async function HomePage() {
  const session = await auth();

  let notes: Note[];
  if (session?.user) {
    notes = await serverClient.getAllNotes();
  } else {
    return (
      <main className={styles.main}>
        <MainNavigation />
        <div className={styles.auxilary}>
          <p>Login in to see notes...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <MainNavigation />
      {session?.user && <NewNote />}

      {session?.user && <Sidebar />}

      {session?.user && <NoteList initialData={notes} />}

      {!session?.user && (
        <div className={styles.auxilary}>
          <p>Login in to see notes...</p>
        </div>
      )}
      {session?.user && <CreateNoteBtn />}
    </main>
  );
}
