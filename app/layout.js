import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dynamicore',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ex-mx">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
