import { useState, useEffect } from 'react'
import { apiService, Product } from '../services/api'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getProducts()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const getProductsByCategory = (category: string) => {
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  }

  const getFeaturedProducts = () => {
    // For now, return first 4 products as featured
    // In a real app, you might have a 'featured' field in the backend
    return products.slice(0, 4)
  }

  const getNewArrivals = () => {
    // Sort by created_at and return latest 6 products
    return [...products]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 6)
  }

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    getProductsByCategory,
    getFeaturedProducts,
    getNewArrivals,
  }
}
