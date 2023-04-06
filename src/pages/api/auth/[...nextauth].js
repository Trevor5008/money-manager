import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from '../../../database/prisma';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { compare } from "bcrypt";

export const authOptions = {
   adapter: PrismaAdapter(prisma),
   session: {
      strategy: "jwt",
   },
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,
      }),
      CredentialsProvider({
         // The name to display on the sign in form (e.g. "Sign in with...")
         name: "Credentials",
         // `credentials` is used to generate a form on the sign in page.
         // You can specify which fields should be submitted, by adding keys to the `credentials` object.
         // e.g. domain, username, password, 2FA token, etc.
         // You can pass any HTML attribute to the <input> tag through the object.
         credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            if (!credentials.username || !credentials.password) {
               return null;
            }

            const user = await prisma.user.findUnique({
               where: {
                  username: credentials.username,
               },
            });

            if (!user) {
               return null;
            }

            const isPasswordValid = await compare(
               credentials.password,
               user.password
            );

            if (!isPasswordValid) {
               return null;
            }

            return {
               id: user.id + "",
               username: user.username,
               name: user.name,
               email: user.email,
            };
         },
      }),
   ],
   callbacks: {
      jwt: ({ token, user }) => {
         console.log("JWT Callback", { token, user });
         if (user) {
            return {
               ...token,
               id: user.id,
            };
         }
         return token;
      },
      session: ({ session, token }) => {
         console.log("Session Callback", { session, token });
         return {
            ...session,
            user: {
               ...session.user,
               id: token.id,
            },
         };
      },
   },
};

export default NextAuth(authOptions);
