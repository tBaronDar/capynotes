"use client";

import React, { useEffect, useState } from "react";
import { useNoteStore } from "@/data/store";
import NewNoteControls from "./new-note-controls";

import styles from "./new-checklist.module.css";

import { ArrayContent } from "@/data/types";

export default function NewChecklist() {
	const [itemContent, setItemContent] = useState("");
	const [arrayContent, setArrayContent] = useState<ArrayContent[]>([]);
	const isEditing = useNoteStore((state) => state.isEditing);

	const newNote = useNoteStore((state) => state.noteMutation);
	const setNewNote = useNoteStore((state) => state.setNoteMutation);

	useEffect(() => {
		const inputArray = newNote.content!.split("[/]");
		console.log("Content: ", newNote.content);
		let arrayContentHelper: ArrayContent[] = [];

		inputArray.forEach((item) => {
			if (item !== "") {
				arrayContentHelper.push({
					isChecked: item.startsWith("1"),
					content: item.substring(1),
				});
			}
		});
		setArrayContent(arrayContentHelper);
	}, [newNote.content]);

	if (!isEditing) {
		return;
	}

	function addItemHandler() {
		const inputText = newNote.content + "0" + itemContent + "[/]";

		setNewNote({
			...newNote,
			content: inputText,
		});
		setItemContent("");
	}

	function checkToggleHandler(clickedItem: ArrayContent) {
		const newItem: ArrayContent = {
			...clickedItem,
			isChecked: !clickedItem.isChecked,
		};
		const updatedArray = arrayContent.map((item) =>
			item.content === clickedItem.content ? newItem : item
		);

		setArrayContent(updatedArray);
		console.log("updatedArray ", updatedArray);
		//turn array to string
		let updatedString = "";
		updatedArray.forEach((item) => {
			const prosimo = item.isChecked ? "1" : "0";
			updatedString = updatedString + prosimo + item.content + "[/]";
		});
		setNewNote({ ...newNote, content: updatedString });
		console.log("the string ", updatedString);
	}
	console.log(arrayContent);

	if (newNote.type === "CHECKLIST") {
		return (
			<article className={styles["new-note"]}>
				<div className={styles.headline}>
					<input
						placeholder="Title..."
						type="text"
						value={newNote?.title || ""}
						onChange={(event) =>
							setNewNote({ ...newNote, title: event.currentTarget.value })
						}
					/>
					<input
						placeholder="Subject..."
						type="text"
						value={newNote?.subject || ""}
						onChange={(event) =>
							setNewNote({ ...newNote, subject: event.currentTarget.value })
						}
					/>
					<p className={styles.type}>{newNote?.type}</p>
				</div>
				<ul className={styles.checklist}>
					{arrayContent.length > 0 &&
						arrayContent.map((item) => (
							<li key={item.content}>
								<input
									type="checkbox"
									checked={item.isChecked}
									onChange={checkToggleHandler.bind(null, item)}
								/>
								<p>{item.content}</p>
							</li>
						))}
				</ul>
				<input
					className={styles.content}
					value={itemContent}
					onChange={(event) => setItemContent(event.currentTarget.value)}
					type="text"
				/>
				<button onClick={addItemHandler}>Add new item</button>
				<NewNoteControls />
			</article>
		);
	}
}
