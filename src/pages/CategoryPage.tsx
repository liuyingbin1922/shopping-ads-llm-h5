import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories } from '../data/mockData'
import { useProducts } from '../hooks/useProducts'

export default function CategoryPage() {
  const { category } = useParams()
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'created_at'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const { products, loading, error, getProductsByCategory } = useProducts()

  const categoryName = category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const categoryData = categories.find(c => c.name.toLowerCase() === categoryName?.toLowerCase())
  
  const filteredProducts = getProductsByCategory(categoryName || '')

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'price':
        comparison = a.price - b.price
        break
      case 'created_at':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading products...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">Failed to load products</h2>
          <p className="text-secondary-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-secondary-200 z-30">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-secondary-900">
            {categoryData?.name || categoryName}
          </h1>
          <p className="text-sm text-secondary-600">
            {filteredProducts.length} products available
          </p>
        </div>
      </div>

      {/* Sort Options */}
      <div className="p-4 border-b border-secondary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-secondary-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'created_at')}
              className="text-sm border border-secondary-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="created_at">Date Added</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1 text-secondary-600 hover:text-secondary-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sortOrder === 'asc' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              No products found
            </h3>
            <p className="text-secondary-600">
              No products available in this category at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
