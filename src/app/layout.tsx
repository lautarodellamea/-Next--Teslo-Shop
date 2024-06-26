import type { Metadata } from 'next'
import { inter } from '@/config/fonts'

import './globals.css'



export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop',
  },
  description: 'Una tienda virtual de productos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {/* <body className={`${inter.className} font-bold cualquie-otra-clase`}> */}
        <div className='px-0 sm:px-10'>{children}</div>
      </body>
    </html>
  )
}
