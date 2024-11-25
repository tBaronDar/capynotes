//[trpc] -> collect the api verbs
//link api verbs to the router
//don't use [trpc].ts for Next AppRouter
//fetchRequestHandler is specific for Next AppRouter. pages router has an other
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server/routers";

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: process.env.NEXTAUTH_URL + "/api/trpc",
		req,
		router: appRouter,
		createContext: (ctx) => ({ ...ctx }),
	});

export { handler as GET, handler as POST };
