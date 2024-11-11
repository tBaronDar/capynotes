"use client";

import { trpc } from "@/app/_trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import superjson from "superjson";

const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 5 * 10 } },
});

export default function TrpcProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	function getBaseUrl(): string {
		if (typeof window !== "undefined") {
			// In the browser, we return a relative URL
			return "";
		}

		// reference for vercel.com
		if (process.env.VERCEL_URL) {
			return `https://${process.env.VERCEL_URL}`;
		}

		// assume localhost
		return `http://localhost:${process.env.PORT ?? 3000}`;
	}
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: getBaseUrl() + "/api/trpc",
					transformer: superjson,
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
