import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;

if (!githubId || !githubSecret) {
  console.warn('GitHub authentication is not configured. Please set GITHUB_ID and GITHUB_SECRET environment variables.');
}

const authOptions: AuthOptions = {
  providers: [
    ...(githubId && githubSecret ? [
      GithubProvider({
        clientId: githubId,
        clientSecret: githubSecret,
      }),
    ] : []),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 