import React from "react";
import NoteTypes from "./sidebar-item.";

import styles from "./sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <NoteTypes
        title="Note Subjects"
        list={["Shopping", "Christmas deco", "party stuff"]}
      />
      <NoteTypes title="Note Types" list={["Checklist", "Text"]} />
      <NoteTypes title="Starred Notes" list={["Checklist", "Text"]} />
    </aside>
  );
}
