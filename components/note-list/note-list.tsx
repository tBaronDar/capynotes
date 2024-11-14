import React from "react";

import NoteItem from "./note-item";

import styles from "./note-list.module.css";
import { Note } from "@prisma/client";

export default function NoteList({ initialData }: { initialData: Note[] }) {
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
