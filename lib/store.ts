import { create } from 'zustand'
import { Product } from './supabase'

export interface CartItem extends Product {
  cartId: string
}

interface CartState {
  boxSize: number
  items: CartItem[]
  setBoxSize: (size: number) => void
  addItem: (product: Product) => void
  removeItem: (cartId: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
}

export const useCart = create<CartState>((set, get) => ({
  boxSize: 1,
  items: [],

  setBoxSize: (size: number) => set({ boxSize: size, items: [] }),

  addItem: (product: Product) => {
    const cartId = `${product.id}-${Date.now()}-${Math.random()}`
    set((state) => ({
      items: [...state.items, { ...product, cartId }],
    }))
  },

  removeItem: (cartId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.cartId !== cartId),
    }))
  },

  clearCart: () => set({ items: [], boxSize: 1 }),

  getTotalPrice: () => {
    const state = get()
    return state.items.reduce((total, item) => total + item.price, 0)
  },

  getItemCount: () => get().items.length,
}))
