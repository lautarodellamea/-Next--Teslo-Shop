'use server';

import { signIn } from '@/auth.config';


// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    // aca recibimos lo que escribimos en el formulario
    console.log({ formData: Object.fromEntries(formData) })


    // aca ponemos lo que querramos, nosotros solo trabajaremos con credentials
    // await signIn('google', formData);
    await signIn('credentials', Object.fromEntries(formData));

    return "Success"



  } catch (error) {

    return "Credentials Signin"
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.';
    //     default:
    //       return 'Something went wrong.';
    //   }
    // }
    // throw error;
  }
}