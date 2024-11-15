//Initialize the tRPC on the server
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
	transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t;

export const createCallerfactory = t.createCallerFactory;
