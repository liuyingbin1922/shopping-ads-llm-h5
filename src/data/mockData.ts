import { Product, Banner, Category } from '../types'

export const banners: Banner[] = [
  {
    id: '1',
    title: 'Summer Collection',
    subtitle: 'Up to 50% off on selected items',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    backgroundColor: '#fef7ee'
  },
  {
    id: '2',
    title: 'New Arrivals',
    subtitle: 'Discover the latest trends',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop',
    backgroundColor: '#f8fafc'
  },
  {
    id: '3',
    title: 'Flash Sale',
    subtitle: 'Limited time offers',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop',
    backgroundColor: '#fef2f2'
  }
]

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    icon: '📱',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop',
    productCount: 156
  },
  {
    id: '2',
    name: 'Fashion',
    icon: '👕',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop',
    productCount: 234
  },
  {
    id: '3',
    name: 'Home & Garden',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop',
    productCount: 89
  },
  {
    id: '4',
    name: 'Sports',
    icon: '⚽',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
    productCount: 67
  },
  {
    id: '5',
    name: 'Beauty',
    icon: '💄',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop',
    productCount: 123
  },
  {
    id: '6',
    name: 'Books',
    icon: '📚',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop',
    productCount: 45
  }
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 89.99,
    originalPrice: 129.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'
    ],
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    tags: ['wireless', 'bluetooth', 'noise-cancelling']
  },
  {
    id: '2',
    name: 'Premium Cotton T-Shirt',
    description: 'Comfortable and stylish cotton t-shirt available in multiple colors.',
    price: 24.99,
    originalPrice: 34.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop'
    ],
    category: 'Fashion',
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    tags: ['cotton', 'casual', 'comfortable']
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring.',
    price: 199.99,
    originalPrice: 249.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop'
    ],
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 256,
    inStock: true,
    tags: ['smartwatch', 'fitness', 'heart-rate']
  },
  {
    id: '4',
    name: 'Organic Coffee Beans',
    description: 'Premium organic coffee beans sourced from sustainable farms.',
    price: 15.99,
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop'
    ],
    category: 'Home & Garden',
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    tags: ['organic', 'coffee', 'sustainable']
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat perfect for home workouts and studio sessions.',
    price: 39.99,
    originalPrice: 59.99,
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400&h=400&fit=crop'
    ],
    category: 'Sports',
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    tags: ['yoga', 'fitness', 'non-slip']
  },
  {
    id: '6',
    name: 'Natural Face Cream',
    description: 'Hydrating face cream with natural ingredients for all skin types.',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'
    ],
    category: 'Beauty',
    rating: 4.3,
    reviewCount: 78,
    inStock: true,
    tags: ['natural', 'hydrating', 'skincare']
  },
  {
    id: '7',
    name: 'Bestselling Novel',
    description: 'Award-winning novel that has captured readers worldwide.',
    price: 12.99,
    originalPrice: 16.99,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop'
    ],
    category: 'Books',
    rating: 4.8,
    reviewCount: 445,
    inStock: true,
    tags: ['bestseller', 'fiction', 'award-winning']
  },
  {
    id: '8',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound and 20-hour battery.',
    price: 79.99,
    originalPrice: 99.99,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'
    ],
    category: 'Electronics',
    rating: 4.4,
    reviewCount: 156,
    inStock: true,
    tags: ['portable', 'waterproof', 'bluetooth']
  }
]
