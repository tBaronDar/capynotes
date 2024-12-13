"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { NoteQuery, NotesMetaProps } from "@/data/types";

import styles from "./sidebar-item.module.css";
import { useNoteStore, useFilterStore } from "@/data/store";

export default function NoteQueries({
	title,
	data,
	queryType,
}: {
	title: string;
	data: string[];
	queryType: keyof NoteQuery;
}) {
	const [selected, setSelected] = useState<string>();
	const [selectedArray, setSelectedArray] = useState<(string | undefined)[]>(
		[]
	);

	const setSubject = useFilterStore((state) => state.setSubjectFilter);
	const subject = useFilterStore((state) => state.subjectFilter);
	const setType = useFilterStore((state) => state.setTypeFilter);
	const type = useFilterStore((state) => state.typeFilter);

	const selectionHelperArray: (string | undefined)[] = [];

	useEffect(() => {
		data.forEach((item) => {
			if (selected === item) {
				selectionHelperArray.push("selected-item");
			} else {
				selectionHelperArray.push(undefined);
			}
		});
		setSelectedArray(selectionHelperArray);
	}, [selected]);

	function clickHandler(selection: string, selectedIndex: number) {
		setSelected(selection);
		//set query term
		if (queryType === "subject") {
			if (subject === selection) {
				setSubject("");
			} else {
				setSubject(selection);
			}
		}
		if (queryType === "type") {
			if (type === selection) {
				setType("");
			} else if (type === "" || type !== selection) {
				setType(selection);
			}
		}
	}

	return (
		<div className={styles["note-options"]}>
			<h3>{title}</h3>
			<ul>
				{data.map((item) => (
					<li key={item}>
						<Link
							className={styles[`${selectedArray[data.indexOf(item)]}`]}
							onClick={clickHandler.bind(null, item, data.indexOf(item))}
							href={"#"}>
							{item}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
