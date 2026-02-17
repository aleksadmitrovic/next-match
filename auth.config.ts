import Credentials from "next-auth/providers/credentials";

// import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./lib/schemas/loginFormSchema";
import { getuserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      name: "credentails",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getuserByEmail(email);

          if (!user || !(await compare(password, user.passwordHash)))
            return null;

          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
