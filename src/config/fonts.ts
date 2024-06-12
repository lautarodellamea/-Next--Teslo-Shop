import { Inter, Montserrat_Alternates } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })

// poner nombre generico a la fuente por si la vamos a cambiar
export const titleFont = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['500', '700'],
})
