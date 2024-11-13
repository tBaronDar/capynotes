import React from "react";

import styles from "./note-item.module.css";
import ItemControls from "./note-item-controls";

export default function Note({ data }: { data: string }) {
	return (
		<article className={styles.note}>
			<div className={styles.headline}>
				<p>Title</p>
				<p>Subject</p>
			</div>
			<p className={styles["note-text"]}>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto
				ipsa sunt numquam explicabo aliquam doloribus. Fuga consectetur tenetur
				odit tempora praesentium, unde, magni provident tempore, veniam
				inventore facilis eos quos.Lorem ipsum dolor, sit amet consectetur
				adipisicing elit. Architecto ipsa sunt numquam explicabo aliquam
				doloribus. Fuga consectetur tenetur odit tempora praesentium, unde,
				magni provident tempore, veniam inventore facilis eos quos.Lorem ipsum
				dolor, sit amet consectetur adipisicing elit. Architecto ipsa sunt
				numquam explicabo aliquam doloribus. Fuga consectetur tenetur odit
				tempora praesentium, unde, magni provident tempore, veniam inventore
				facilis eos quos.
			</p>
			<ItemControls />
		</article>
	);
}
