import React from "react";
import AuthControls from "../auth/controls";

import styles from "./main-navigation.module.css";
import { auth } from "@/auth";
import Image from "next/image";

export default async function MainNavigation() {
	const session = await auth();
	return (
		<header className={styles["main-navigation"]}>
			<div>LOGO</div>
			{!session?.user && <h1>CapyNotes</h1>}
			{session?.user && <h1>Welcom to CapyNotes {session?.user?.name}</h1>}
			{session?.user?.image && session.user.name && (
				<Image
					src={session.user.image}
					alt={session.user.name}
					width={32}
					height={32}
				/>
			)}
			<AuthControls />
		</header>
	);
}
