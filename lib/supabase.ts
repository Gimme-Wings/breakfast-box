import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  category: 'bagel' | 'spread' | 'veggie' | 'drink' | 'other'
  price: number
  image_url?: string
  description?: string
}

export type Order = {
  id: string
  customer_email: string
  customer_name: string
  total_price: number
  box_size: number
  created_at: string
  status: 'pending' | 'paid' | 'completed'
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
}
