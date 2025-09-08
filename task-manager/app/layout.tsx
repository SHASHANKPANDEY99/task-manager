import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'MERN/Next.js Task Management App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
