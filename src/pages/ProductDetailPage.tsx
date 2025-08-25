import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { apiService, Product } from '../services/api'
import { cn } from '../utils/cn'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id))
    }
  }, [id])

  const fetchProduct = async (productId: number) => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getProduct(productId)
      setProduct(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product')
      console.error('Error fetching product:', err)
    } finally {
      setLoading(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading product...</p>
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
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">Failed to load product</h2>
          <p className="text-secondary-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">Product Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // For now, no discount calculation since backend doesn't provide originalPrice
  const discountPercentage = 0

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-secondary-200 z-30">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 text-secondary-600 hover:text-secondary-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-secondary-900">Product Details</h1>
          <button className="p-2 text-secondary-600 hover:text-secondary-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={true}
          className="h-80"
          onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
        >
          <SwiperSlide>
            <img
              src={product.image_url || 'https://via.placeholder.com/400x400?text=No+Image'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
        
        {/* Image Thumbnails */}
        <div className="flex space-x-2 p-4 overflow-x-auto">
          <button
            onClick={() => setSelectedImage(0)}
            className={cn(
              "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2",
              selectedImage === 0 
                ? "border-primary-500" 
                : "border-secondary-200"
            )}
          >
            <img
              src={product.image_url || 'https://via.placeholder.com/400x400?text=No+Image'}
              alt={`${product.name} thumbnail`}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-secondary-900 mb-2">{product.name}</h1>
          <p className="text-secondary-600 text-sm">{product.description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < 4 // Default rating since backend doesn't provide rating
                    ? "text-yellow-400 fill-current" 
                    : "text-secondary-300"
                )}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-secondary-600">
            4.0 (0 reviews) {/* Default values since backend doesn't provide rating */}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-secondary-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-secondary-600">Stock:</span>
          <span className={`text-sm font-medium ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock_quantity > 0 ? `${product.stock_quantity} available` : 'Out of stock'}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-secondary-700">Quantity:</span>
          <div className="flex items-center border border-secondary-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-secondary-600 hover:text-secondary-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="px-4 py-2 text-secondary-900 font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-secondary-600 hover:text-secondary-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button className="flex-1 btn-primary py-3">
            Add to Cart
          </button>
          <button className="flex-1 btn-secondary py-3">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
