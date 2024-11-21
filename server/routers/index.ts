//define the router that contains (server) procedure
//procedures are called trough /api/trpc/[trpc].ts
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/prisma/client";

export const appRouter = router({
	//Notes
	getAllNotes: publicProcedure
		.input(z.object({ authorId: z.string() }))
		.query(async ({ input }) => {
			return await prisma.note.findMany({
				where: { authorId: input.authorId },
			});
		}),

	createNote: publicProcedure
		.input(
			z.object({
				title: z.string(),
				type: z.enum(["CHECKLIST", "TEXTNOTE"]),
				content: z.string(),
				subject: z.string(),
				authorId: z.string(),
			})
		)
		.mutation(({ input }) => {
			return prisma.note.create({
				data: {
					title: input.title,
					type: input.type,
					subject: input.subject,
					content: input.content,
					authorId: input.authorId,
				},
			});
		}),

	//Users
	getUserData: publicProcedure
		.input(
			z.object({
				email: z.string(),
			})
		)
		.query(async ({ input }) => {
			return await prisma.user.findUnique({ where: { email: input.email } });
		}),
	getUserlist: publicProcedure.query(async () => await prisma.user.findMany()),

	createUser: publicProcedure
		.input(
			z.object({
				name: z.string(),
				id: z.string(),
				email: z.string(),
				profilePic: z.string(),
			})
		)
		.mutation(({ input }) =>
			prisma.user.create({
				data: {
					name: input.name,
					id: input.id,
					email: input.email,
					profilePic: input.profilePic,
				},
			})
		),
});
// export type definition of API
export type AppRouter = typeof appRouter;
