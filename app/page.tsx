import Image from "next/image";
import styles from "./page.module.css";
import { serverClient } from "./_trpc/serverClient";

export default function Home() {
	const test = serverClient.test();
	return (
		<main>
			<div>sdadas</div>
		</main>
	);
}
