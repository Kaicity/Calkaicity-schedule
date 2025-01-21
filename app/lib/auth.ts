import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Zoom from 'next-auth/providers/zoom';

import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Zoom({
      clientId: process.env.AUTH_ZOOM_ID,
      clientSecret: process.env.AUTH_ZOOM_SECRET,
    }),
  ],
});
