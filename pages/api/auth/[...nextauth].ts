import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma'; // Import Prisma client

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && user.password === credentials?.password) {
          return { id: user.id, email: user.email, role: user.role }; // Only include essential fields
        } else {
          return null; // Return null if no match
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page (if needed)
  },
  callbacks: {
    // Attach custom fields to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID
        token.role = user.role; // Add user role
      }
      return token;
    },
    // Include custom fields in the session object
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Add user ID from token
        session.user.role = token.role; // Add user role from token
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});