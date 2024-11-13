import React from "react";

import { NoteTypesProps } from "@/data/types";

import styles from "./note-options.module.css";
import Link from "next/link";

export default function NoteTypes({ title, list }: NoteTypesProps) {
	return (
		<section className={styles["note-options"]}>
			<h3>{title}</h3>
			<ul>
				{list.map((item) => (
					<Link href={"#"} key={item}>
						{item}
					</Link>
				))}
			</ul>
		</section>
	);
}
