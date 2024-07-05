import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
    providers: [
      Credentials({
        credentials: {
            email: {label: "Email"},
            password: {label: "Password", type: "password"},
        },
        async authorize() {
            return null;
        }
    })
      ]
}