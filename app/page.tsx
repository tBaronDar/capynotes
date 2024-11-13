import { serverClient } from "./_trpc/serverClient";
import MainNavigation from "@/components/navigation/main-navigation";

import styles from "./page.module.css";
import NoteTypes from "@/components/sidebar/sidebar-item.";
import NoteList from "@/components/note-list/note-list";
import CreateNoteBtn from "@/components/controls/create-note";
import { auth } from "@/auth";
import Sidebar from "@/components/sidebar/sidebar";

export default async function HomePage() {
  const session = await auth();
  // const test = serverClient.test();
  return (
    <main className={styles.main}>
      <MainNavigation />

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
