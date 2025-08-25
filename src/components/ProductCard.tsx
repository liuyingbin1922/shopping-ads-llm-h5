import { Product } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { cn } from '../utils/cn'

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const navigate = useNavigate()

  // For now, no discount calculation since backend doesn't provide originalPrice
  const discountPercentage = 0

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className={cn(
        "card cursor-pointer hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      <div className="relative">
        <img
          src={product.image_url || 'https://via.placeholder.com/400x400?text=No+Image'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </div>
        )}
        {product.stock_quantity <= 0 && (
          <div className="absolute top-2 right-2 bg-secondary-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-secondary-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
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
          <span className="text-xs text-secondary-500 ml-1">
            (0) {/* Default review count since backend doesn't provide it */}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-secondary-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation()
              // Add to cart logic here
            }}
            className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
