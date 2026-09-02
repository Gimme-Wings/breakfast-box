'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4 bg-white">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold">Breakfast Box</h1>
          <p className="text-xl text-dark-gray md:text-2xl">Create your perfect breakfast, one item at a time.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-black p-8 space-y-4">
            <h3 className="font-bold text-lg">What We Offer</h3>
            <ul className="space-y-2 text-dark-gray">
              <li>✓ Fresh bagels</li>
              <li>✓ Quality spreads & egg salad</li>
              <li>✓ Fresh veggies</li>
              <li>✓ Coffee & juice</li>
            </ul>
          </div>
          
          <div className="border-2 border-black p-8 space-y-4">
            <h3 className="font-bold text-lg">How It Works</h3>
            <ol className="space-y-2 text-dark-gray text-sm">
              <li><span className="font-bold">1.</span> Pick your box size</li>
              <li><span className="font-bold">2.</span> Choose your items</li>
              <li><span className="font-bold">3.</span> Review your box</li>
              <li><span className="font-bold">4.</span> Checkout & pay</li>
            </ol>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/customize"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-lg hover:bg-dark-gray transition-colors"
          >
            Build Your Box
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </main>
  )
}
