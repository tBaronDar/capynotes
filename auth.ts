import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";

export const authOptions = {
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
		LinkedIn({
			clientId: process.env.AUTH_LINKEDIN_ID,
			clientSecret: process.env.AUTH_LINKEDIN_SECRET,
		}),
	],
	callbacks: {
		async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
			console.log("Redirect ", url);
			return baseUrl;
		},
	},
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
