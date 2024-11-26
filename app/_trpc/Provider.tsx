"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import SuperJSON from "superjson";

import { trpc } from "./client";

//change to select enviroment
let batchUrl: string;
if (process.env.NODE_ENV === "development") {
	batchUrl = "http://localhost:3000/api/trpc";
} else if (process.env.NODE_ENV === "production") {
	batchUrl = "https://capynotes.vercel.app/api/trpc";
}

// console.log(process.env.NODE_ENV, batchUrl!);

export default function Provider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient({}));
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: batchUrl,
					transformer: SuperJSON,
				}),
			],
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
}
