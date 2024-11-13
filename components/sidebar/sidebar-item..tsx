"use client";
import React, { useState } from "react";
import Link from "next/link";

import { NoteTypesProps } from "@/data/types";

import styles from "./sidebar-item.module.css";

export default function NoteTypes({ title, list }: NoteTypesProps) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className={styles["note-options"]}>
      <h3>{title}</h3>
      <ul>
        {list.map((item) => (
          <li key={item}>
            <Link
              className={`styles.${selected}`}
              onClick={() => {
                setSelected("selected");
              }}
              href={"#"}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
