import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const authConfig: NextAuthConfig = {

  // aca manejamos las paginas
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  // los providers nos permiten autenticarnos con google, facebook, etc
  providers: [
    Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        console.log(parsedCredentials.success)

        // si no lo gra hacer el parseo correcto
        // al devolver null es como no hacer la autenticacion
        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        console.log("auth.config.ts")
        console.log({ email, password })



        // Buscar el correo

        // Comparar las contraseñas

        // Regresar el usuario


        return null
      },
    }),
  ],
};


// exportamos lo siguiente
export const { signIn, signOut, auth } = NextAuth(authConfig)