import type { Metadata } from 'next'
import { inter } from '@/config/fonts'

import './globals.css'
import { TopMenu } from '@/components/ui/top-menu/TopMenu'
import { Sidebar } from '@/components'

export const metadata: Metadata = {
  title: 'Teslo | Shop',
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
        <TopMenu />
        <Sidebar />
        <div className='px-0 sm:px-10'>{children}</div>
      </body>
    </html>
  )
}
