"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { NotesMetaProps } from "@/data/types";

import styles from "./sidebar-item.module.css";
import { useNoteStore } from "@/data/store";

export default function NoteTypes({
	title,
	data,
}: {
	title: string;
	data: NotesMetaProps[];
}) {
	const [selected, setSelected] = useState<number>();
	const [selectedArray, setSelectedArray] = useState<(string | undefined)[]>(
		[]
	);
	const [uniqueDataArray, setUniqueDataArray] = useState<string[]>([]);

	const setNoteMutation = useNoteStore((state) => state.setNoteMutation);
	const noteMutation = useNoteStore((state) => state.noteMutation);

	const selectionHelperArray: (string | undefined)[] = [];
	const uniqueDataHelperArray: string[] = [];

	useEffect(() => {
		console.log("data", data);
		data.forEach((item) => {
			if (data.indexOf(item) === -1) {
				console.log("safafafafafafafa");
				uniqueDataHelperArray.push(item.metaData);
			}
		});
		setUniqueDataArray(uniqueDataHelperArray);
		console.log("in effect", uniqueDataHelperArray);
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
			subject: data[selectedListItem].metaData,
		});
	}

	console.log("Unique array", uniqueDataArray);
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
