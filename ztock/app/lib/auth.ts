import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { prisma } from "./db";

export const { handlers, signIn, signOut, auth} = NextAuth({
    callbacks: {
        authorized: async ({auth}) => {
            return !!auth
        }
    },
    adapter: PrismaAdapter(prisma),
    providers: [Google],
})