import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import Provider from "./_trpc/Provider";

import { Roboto, Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	weight: "variable",
});

export const metadata: Metadata = {
	title: "CapyNotes",
	description: "A note taking App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider>
					<Provider>{children}</Provider>
				</SessionProvider>
			</body>
		</html>
	);
}
