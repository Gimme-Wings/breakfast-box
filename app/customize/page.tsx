'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/store'
import { Product } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import CartPreview from '@/components/CartPreview'
import QuantitySelector from '@/components/QuantitySelector'

const DEMO_PRODUCTS: Product[] = [
  { id: 'bagel-1', name: 'Plain Bagel', category: 'bagel', price: 3.0 },
  { id: 'bagel-2', name: 'Everything Bagel', category: 'bagel', price: 3.5 },
  { id: 'bagel-3', name: 'Sesame Bagel', category: 'bagel', price: 3.5 },
  { id: 'bagel-4', name: 'Poppy Seed Bagel', category: 'bagel', price: 3.5 },
  { id: 'spread-1', name: 'Cream Cheese', category: 'spread', price: 1.5 },
  { id: 'spread-2', name: 'Egg Salad', category: 'spread', price: 2.5 },
  { id: 'spread-3', name: 'Peanut Butter', category: 'spread', price: 1.5 },
  { id: 'spread-4', name: 'Honey Butter', category: 'spread', price: 1.75 },
  { id: 'veg-1', name: 'Mixed Veggies Cup', category: 'veggie', price: 2.0 },
  { id: 'veg-2', name: 'Fresh Berries', category: 'veggie', price: 3.0 },
  { id: 'veg-3', name: 'Cucumber Slices', category: 'veggie', price: 1.5 },
  { id: 'veg-4', name: 'Tomato Slices', category: 'veggie', price: 1.5 },
  { id: 'drink-1', name: 'Coffee', category: 'drink', price: 2.5 },
  { id: 'drink-2', name: 'Orange Juice', category: 'drink', price: 2.5 },
  { id: 'drink-3', name: 'Smoothie', category: 'drink', price: 3.5 },
  { id: 'drink-4', name: 'Tea', category: 'drink', price: 2.0 },
]

export default function Customize() {
  const { boxSize, setBoxSize, addItem } = useCart()
  const [products] = useState<Product[]>(DEMO_PRODUCTS)

  const groupedProducts = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
      return acc
    },
    {} as Record<string, Product[]>
  )

  const categoryNames: Record<string, string> = {
    bagel: 'Bagels',
    spread: 'Spreads',
    veggie: 'Veggies',
    drink: 'Drinks',
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-6 md:p-12 border-r border-black">
          <div className="mb-12 pb-8 border-b-2 border-black">
            <h2 className="text-2xl font-bold mb-6">How many people?</h2>
            <QuantitySelector value={boxSize} onChange={setBoxSize} />
          </div>

          <div className="space-y-12">
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <div key={category}>
                <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-dark-gray">
                  {categoryNames[category]}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAdd={() => addItem(product)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 bg-gray border-t lg:border-t-0 lg:border-l border-black p-6">
          <CartPreview />
        </div>
      </div>
    </div>
  )
}
