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
	data: NotesMetaProps[];
	queryType: keyof NoteQuery;
}) {
	const [selected, setSelected] = useState<number>();
	const [selectedArray, setSelectedArray] = useState<(string | undefined)[]>(
		[]
	);
	const [uniqueDataArray, setUniqueDataArray] = useState<string[]>([]);

	const setSubject = useFilterStore((state) => state.setSubjectFilter);
	const subject = useFilterStore((state) => state.subjectFilter);
	const setType = useFilterStore((state) => state.setTypeFilter);
	const type = useFilterStore((state) => state.typeFilter);

	const setNoteMutation = useNoteStore((state) => state.setNoteMutation);
	const noteMutation = useNoteStore((state) => state.noteMutation);

	const selectionHelperArray: (string | undefined)[] = [];
	const uniqueDataHelperArray: string[] = [];

	useEffect(() => {
		data.forEach((item) => {
			if (uniqueDataHelperArray.indexOf(item.metaData) === -1) {
				return uniqueDataHelperArray.push(item.metaData);
			}
		});

		setUniqueDataArray(uniqueDataHelperArray);

		uniqueDataHelperArray.forEach((item) => {
			if (uniqueDataHelperArray.indexOf(item) === selected) {
				selectionHelperArray.push("selected-item");
			} else {
				selectionHelperArray.push(undefined);
			}
		});
		setSelectedArray(selectionHelperArray);
	}, [data, selected]);

	function clickHandler(selectedListItem: number) {
		if (selected === selectedListItem) {
			setSelected(undefined);
		} else {
			setSelected(selectedListItem);
		}
		setNoteMutation({
			...noteMutation,
			[queryType]: data[selectedListItem].metaData,
		});

		//set query term
		if (queryType === "subject") {
			if (subject === data[selectedListItem].metaData) {
				setSubject("");
			} else {
				setSubject(data[selectedListItem].metaData);
			}
		}
		if (queryType === "type") {
			if (type === data[selectedListItem].metaData) {
				setType("");
			} else {
				setType(data[selectedListItem].metaData);
			}
		}
	}

	// console.log("Unique array", uniqueDataArray);
	return (
		<div className={styles["note-options"]}>
			<h3>{title}</h3>
			<ul>
				{uniqueDataArray.map((item) => (
					<li key={item}>
						<Link
							className={
								styles[`${selectedArray[uniqueDataArray.indexOf(item)]}`]
							}
							onClick={clickHandler.bind(null, uniqueDataArray.indexOf(item))}
							href={"#"}>
							{item}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
