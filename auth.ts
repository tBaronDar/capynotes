import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";

let gitHubClientId: string;
let gitHubClientSecret: string;

let linkedInClientId: string;
let linkedInClientSecret: string;

if (process.env.NODE_ENV === "development") {
	//gitHub dev
	gitHubClientId = process.env.AUTH_GITHUB_ID_DEV!;
	gitHubClientSecret = process.env.AUTH_GITHUB_SECRET_DEV!;
	//linkedIn dev
	linkedInClientId = process.env.AUTH_LINKEDIN_ID!;
	linkedInClientSecret = process.env.AUTH_LINKEDIN_SECRET_DEV!;
} else {
	//gitHub prod
	gitHubClientId = process.env.AUTH_GITHUB_ID_PROD!;
	gitHubClientSecret = process.env.AUTH_GITHUB_SECRET_PROD!;
	//linkedIn prod
	linkedInClientId = process.env.AUTH_LINKEDIN_ID!;
	linkedInClientSecret = process.env.AUTH_LINKEDIN_SECRET_PROD!;
}

export const authOptions = {
	providers: [
		GitHub({
			clientId: gitHubClientId,
			clientSecret: gitHubClientSecret,
		}),
		LinkedIn({
			clientId: linkedInClientId,
			clientSecret: linkedInClientSecret,
		}),
	],
	callbacks: {
		async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
			//to check the callback
			console.log("Redirect ", url);
			return baseUrl;
		},
	},
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
