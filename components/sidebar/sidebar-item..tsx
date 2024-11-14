"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { NoteTypesProps } from "@/data/types";

import styles from "./sidebar-item.module.css";
import { useStore } from "@/data/store";

export default function NoteTypes({ title, list }: NoteTypesProps) {
	const [selected, setSelected] = useState<number>();
	const [selectedArray, setSelectedArray] = useState<(string | undefined)[]>(
		[]
	);

	const setNoteMutation = useStore((state) => state.setNoteMutation);
	const noteMutation = useStore((state) => state.noteMutation);

	const selectionHelperArray: (string | undefined)[] = [];

	useEffect(() => {
		list.forEach((item) => {
			if (list.indexOf(item) === selected) {
				selectionHelperArray.push("selected-item");
			} else {
				selectionHelperArray.push(undefined);
			}
		});
		setSelectedArray(selectionHelperArray);
	}, [list, selected]);

	function clickHandler(selectedListItem: number) {
		if (selected === selectedListItem) {
			setSelected(undefined);
		} else {
			setSelected(selectedListItem);
		}
		setNoteMutation({
			...noteMutation,
			subject: list[selectedListItem],
		});
	}

	return (
		<div className={styles["note-options"]}>
			<h3>{title}</h3>
			<ul>
				{list.map((item) => (
					<li key={item}>
						<Link
							className={styles[`${selectedArray[list.indexOf(item)]}`]}
							onClick={clickHandler.bind(null, list.indexOf(item))}
							href={"#"}>
							{item}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
