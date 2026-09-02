import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Breakfast Box - Custom Breakfast Delivery',
  description: 'Create your perfect breakfast box with bagels, spreads, veggies, and drinks.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white text-black">
        <header className="border-b border-black sticky top-0 z-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:opacity-70">
              breakfast box
            </Link>
            <div className="text-sm text-dark-gray">custom breakfast delivery</div>
          </div>
        </header>
        {children}
        <footer className="border-t border-black mt-16 bg-gray">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-dark-gray">
            <p>&copy; 2024 Breakfast Box. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
