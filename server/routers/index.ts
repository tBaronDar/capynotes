//define the router that contains (server) procedure
//procedures are called trough /api/trpc/[trpc].ts
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/prisma/client";

export const appRouter = router({
  getAllNotes: publicProcedure.query(async () => prisma.note.findMany()),

  test: publicProcedure.query(async () => "dsdsdsd"),
});
// export type definition of API
export type AppRouter = typeof appRouter;
