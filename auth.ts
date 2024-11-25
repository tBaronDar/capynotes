import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GitHub,
		LinkedIn({
			clientId: process.env.AUTH_LINKEDIN_ID,
			clientSecret: process.env.AUTH_LINKEDIN_SECRET,
		}),
	],
	callbacks: {
		async redirect({ url, baseUrl }) {
			console.log("Redirect ", url);
			return baseUrl;
		},
	},
});
