import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const clientId = process.env.AUTH_GOOGLE_ID;
const clientSecret = process.env.AUTH_GOOGLE_SECRET;

if (!clientId || !clientSecret) {
  throw new Error ("AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET are required");
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId,
      clientSecret,
    })
  ],
});