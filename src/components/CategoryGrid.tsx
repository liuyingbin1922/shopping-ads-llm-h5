import { Category } from '../types'
import { useNavigate } from 'react-router-dom'

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const navigate = useNavigate()

  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-semibold text-secondary-900 mb-4">Categories</h2>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
            className="flex flex-col items-center p-4 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors duration-200"
          >
            <div className="w-12 h-12 text-2xl mb-2 flex items-center justify-center">
              {category.icon}
            </div>
            <span className="text-sm font-medium text-secondary-700 text-center">
              {category.name}
            </span>
            <span className="text-xs text-secondary-500 mt-1">
              {category.productCount} items
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
