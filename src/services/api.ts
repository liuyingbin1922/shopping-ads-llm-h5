// API base URL
const API_BASE_URL = 'http://localhost:8000/api/v1'

// Product interface matching backend response
export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image_url: string | null
  stock_quantity: number
  is_active: boolean
  created_at: string
  updated_at: string | null
}

// API service class
class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  // Generic fetch method with error handling
  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      // If it's a network error (API not available), provide a more specific message
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Backend API is not available. Please make sure the server is running on http://localhost:8000')
      }
      throw error
    }
  }

  // Get all products
  async getProducts(): Promise<Product[]> {
    return this.fetchApi<Product[]>('/products')
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.fetchApi<Product[]>(`/products?category=${encodeURIComponent(category)}`)
  }

  // Get single product by ID
  async getProduct(id: number): Promise<Product> {
    return this.fetchApi<Product>(`/products/${id}`)
  }
}

// Export singleton instance
export const apiService = new ApiService(API_BASE_URL)
