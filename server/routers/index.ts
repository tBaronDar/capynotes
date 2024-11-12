//define the router that contains (server) procedure
//procedures are called trough /api/trpc/[trpc].ts
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
	hello: publicProcedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query((opts) => {
			return {
				greeting: `hello ${opts.input.text}`,
			};
		}),
	test: publicProcedure.query(async () => "dsdsdsd"),
});
// export type definition of API
export type AppRouter = typeof appRouter;
