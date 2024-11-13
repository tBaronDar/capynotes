import React from "react";
import { signOut, signIn, auth } from "@/auth";

import styles from "./controls.module.css";

export default async function AuthControls() {
	const session = await auth();

	return (
		<div>
			<form
				action={async () => {
					"use server";
					await signIn();
				}}>
				{!session?.user && (
					<button type="submit">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className={styles.icon}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
							/>
						</svg>
					</button>
				)}
			</form>
			{session?.user && (
				<form
					action={async () => {
						"use server";
						await signOut();
					}}>
					<button type="submit">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className={styles.icon}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
							/>
						</svg>
					</button>
				</form>
			)}
		</div>
	);
}
