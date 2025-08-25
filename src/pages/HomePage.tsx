import { useState } from 'react'
import BannerCarousel from '../components/BannerCarousel'
import CategoryGrid from '../components/CategoryGrid'
import ProductCard from '../components/ProductCard'
import { banners, categories } from '../data/mockData'
import { useProducts } from '../hooks/useProducts'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const { products, loading, error, getProductsByCategory, getFeaturedProducts, getNewArrivals } = useProducts()

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : getProductsByCategory(selectedCategory)

  const featuredProducts = getFeaturedProducts()
  const newArrivals = getNewArrivals()
  // For now, no on-sale products since backend doesn't provide originalPrice
  const onSaleProducts: any[] = []

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
    <div className="space-y-6">
      {/* Banner Carousel */}
      <BannerCarousel banners={banners} />

      {/* Categories */}
      <CategoryGrid categories={categories} />

      {/* Featured Products */}
      <section className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary-900">Featured Products</h2>
          <button className="text-primary-600 text-sm font-medium">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary-900">New Arrivals</h2>
          <button className="text-primary-600 text-sm font-medium">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* On Sale */}
      <section className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary-900">On Sale</h2>
          <button className="text-primary-600 text-sm font-medium">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {onSaleProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white p-4">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">All Products</h2>
        
        {/* Category Filter */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === category.name
                  ? 'bg-primary-500 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
