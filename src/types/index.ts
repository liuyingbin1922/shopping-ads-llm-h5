export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  rating: number
  reviewCount: number
  inStock: boolean
  tags: string[]
  specifications?: Record<string, string>
}

export interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  link?: string
  backgroundColor?: string
}

export interface Category {
  id: string
  name: string
  icon: string
  image?: string
  productCount: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  address?: Address[]
}

export interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  name: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  isDefault: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  estimatedDelivery?: string
}
