import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

// Debug: Check if environment variables are loaded
console.log('GitHub ID exists:', !!process.env.AUTH_GITHUB_ID);
console.log('GitHub Secret exists:', !!process.env.AUTH_GITHUB_SECRET);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
