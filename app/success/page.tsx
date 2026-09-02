'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useCart } from '@/lib/store'

export default function Success() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 bg-white">
      <div className="max-w-md text-center space-y-6">
        <CheckCircle size={64} className="mx-auto" />
        <h1 className="text-4xl font-bold">Order Confirmed!</h1>
        <p className="text-lg text-dark-gray">
          Your breakfast box order has been received. Check your email for confirmation.
        </p>
        <div className="space-y-3 pt-4 border-t-2 border-black">
          <p className="text-sm font-bold">What's next:</p>
          <ul className="text-sm text-dark-gray space-y-1">
            <li>✓ Confirmation email sent</li>
            <li>✓ Your box is being prepared</li>
            <li>✓ Ready for delivery/pickup</li>
          </ul>
        </div>
        <Link
          href="/"
          className="inline-block bg-black text-white px-8 py-3 font-bold hover:bg-dark-gray transition-colors mt-6"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
