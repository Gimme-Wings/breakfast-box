'use client'

import { useState, useRouter } from 'react'
import { useCart } from '@/lib/store'
import { loadStripe } from '@stripe/js'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

export default function Checkout() {
  const router = useRouter()
  const { items, getTotalPrice, boxSize, clearCart } = useCart()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const total = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold">Your box is empty</h1>
          <p className="text-dark-gray">Add items before checking out</p>
          <Link
            href="/customize"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold hover:bg-dark-gray"
          >
            <ArrowLeft size={18} />
            Back to Customize
          </Link>
        </div>
      </div>
    )
  }

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !name) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
          })),
          email,
          name,
          boxSize,
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        return
      }

      if (data.success) {
        clearCart()
        router.push('/success')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Failed to process checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          href="/customize"
          className="inline-flex items-center gap-2 text-dark-gray mb-8 hover:text-black"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Checkout</h1>
            <p className="text-dark-gray">Complete your breakfast box order</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="border-2 border-black p-6 space-y-4">
                <h2 className="text-lg font-bold mb-4">Delivery Info</h2>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:bg-gray"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:bg-gray"
                      required
                    />
                  </div>

                  {error && (
                    <div className="p-3 border-2 border-black bg-white text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 font-bold text-lg hover:bg-dark-gray disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                  </button>
                </form>
              </div>
            </div>

            <div>
              <div className="border-2 border-black p-6 space-y-4">
                <h2 className="text-lg font-bold">Order Summary</h2>

                <div className="space-y-1 pb-4 border-b-2 border-black">
                  <p className="text-sm text-dark-gray">Box Size</p>
                  <p className="font-bold">{boxSize} {boxSize === 1 ? 'Person' : 'People'}</p>
                </div>

                <div className="space-y-3 pb-4 border-b-2 border-black">
                  <p className="text-sm font-bold">Items</p>
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
