import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [GitHub, LinkedIn],
});
