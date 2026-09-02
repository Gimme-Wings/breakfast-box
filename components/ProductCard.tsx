'use client'

import { Product } from '@/lib/supabase'
import { Plus } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onAdd: () => void
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <button
      onClick={onAdd}
      className="p-4 border-2 border-black text-left hover:bg-black hover:text-white transition-colors h-full flex flex-col justify-between"
    >
      <div>
        <h4 className="font-bold text-sm">{product.name}</h4>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-current">
        <span className="font-bold">${product.price.toFixed(2)}</span>
        <Plus size={18} />
      </div>
    </button>
  )
}
