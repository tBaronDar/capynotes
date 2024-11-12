import Image from "next/image";
import styles from "./page.module.css";
import { serverClient } from "./_trpc/serverClient";
import { signIn } from "@/auth";

export default function Home() {
	const test = serverClient.test();
	return (
		<main>
			<form
				action={async () => {
					"use server";
					await signIn();
				}}>
				<button type="submit">Signin</button>
			</form>
			<div>sdadas</div>
		</main>
	);
}
