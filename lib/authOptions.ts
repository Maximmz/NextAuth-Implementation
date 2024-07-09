import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./server-helpers";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
            email: {label: "Email"},
            password: {label: "Password", type: "password"},
        },
        async authorize(credentials) {
          if(!credentials || !credentials.email || !credentials.password)
            return null;
          try {
            await connectToDb();
            const user = await prisma.user.findFirst({where:{email: credentials.email},
            });
            if(!user?.hashedPassword) {
              return null;
            }
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
               user.hashedPassword);
            if (!isPasswordValid) {
                return null;
            }
            return { id: user.id, name: user.name, email: user.email };
          } catch(error) {
            console.log(error);
            return null;
          }
          finally {
            await prisma.$disconnect();
          }
         
        }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
      ]
}