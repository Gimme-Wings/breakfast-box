'use client'

import Link from 'next/link'
import { useCart } from '@/lib/store'
import { Trash2, ShoppingBag } from 'lucide-react'

export default function CartPreview() {
  const { items, boxSize, removeItem, getTotalPrice, clearCart } = useCart()
  const total = getTotalPrice()
  const itemCount = items.length

  return (
    <div className="space-y-6 sticky top-24">
      <div>
        <h2 className="text-2xl font-bold">Your Box</h2>
        <p className="text-sm text-dark-gray mt-1">
          {boxSize} {boxSize === 1 ? 'person' : 'people'}
        </p>
      </div>

      <div className="border-2 border-black bg-white p-6 min-h-48">
        {itemCount === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center text-dark-gray">
            <ShoppingBag size={32} className="mb-2" />
            <p className="text-sm">Add items to build your box</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.cartId}
                className="flex justify-between items-center text-sm py-2 px-2 hover:bg-gray transition-colors group"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-dark-gray">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeItem(item.cartId)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-dark-gray hover:text-black"
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t-2 border-black pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-dark-gray">Items:</span>
          <span className="font-bold">{itemCount}</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-b border-black pb-3">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {itemCount > 0 && (
        <Link
          href="/checkout"
          className="block w-full bg-black text-white py-4 font-bold text-center hover:bg-dark-gray transition-colors"
        >
          Checkout
        </Link>
      )}

      {itemCount > 0 && (
        <button
          onClick={clearCart}
          className="w-full text-sm text-dark-gray hover:text-black transition-colors underline"
        >
          Clear Box
        </button>
      )}
    </div>
  )
}
