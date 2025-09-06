// Analytics service for tracking user interactions
const API_BASE_URL = 'http://localhost:8000/api/v1'

// Analytics event types
export interface AnalyticsEvent {
  event_type: string
  event_name: string
  page_url: string
  user_id?: string
  session_id?: string
  timestamp?: string
  properties?: Record<string, any>
}

// Product-specific analytics events
export interface ProductAnalyticsEvent extends AnalyticsEvent {
  properties: {
    product_id: number
    product_name: string
    product_price: number
    product_category: string
    [key: string]: any
  }
}

// Analytics service class
class AnalyticsService {
  private baseUrl: string
  private sessionId: string
  private userId?: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.sessionId = this.generateSessionId()
    this.userId = this.getUserId()
  }

  // Generate a unique session ID
  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  // Get user ID from localStorage or generate one
  private getUserId(): string | undefined {
    let userId = localStorage.getItem('analytics_user_id')
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('analytics_user_id', userId)
    }
    return userId
  }

  // Get current page URL
  private getCurrentPageUrl(): string {
    return window.location.href
  }

  // Generic track method
  async track(event: AnalyticsEvent): Promise<void> {
    try {
      const payload = {
        ...event,
        user_id: this.userId,
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
        page_url: event.page_url || this.getCurrentPageUrl(),
      }

      const response = await fetch(`${this.baseUrl}/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Analytics tracking failed: ${response.status}`)
      }

      console.log('Analytics event tracked:', event.event_name)
    } catch (error) {
      console.error('Failed to track analytics event:', error)
      // Don't throw error to avoid breaking user experience
    }
  }

  // Track page view
  async trackPageView(pageName: string, additionalProperties?: Record<string, any>): Promise<void> {
    await this.track({
      event_type: 'page_view',
      event_name: `${pageName}_visited`,
      page_url: this.getCurrentPageUrl(),
      properties: additionalProperties,
    })
  }

  // Track product view
  async trackProductView(product: {
    id: number
    name: string
    price: number
    category: string
  }): Promise<void> {
    await this.track({
      event_type: 'product_view',
      event_name: 'product_viewed',
      page_url: this.getCurrentPageUrl(),
      properties: {
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_category: product.category,
      },
    })
  }

  // Track product card click
  async trackProductCardClick(product: {
    id: number
    name: string
    price: number
    category: string
  }): Promise<void> {
    await this.track({
      event_type: 'product_interaction',
      event_name: 'product_card_clicked',
      page_url: this.getCurrentPageUrl(),
      properties: {
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_category: product.category,
      },
    })
  }

  // Track add to cart
  async trackAddToCart(product: {
    id: number
    name: string
    price: number
    category: string
  }): Promise<void> {
    await this.track({
      event_type: 'cart_action',
      event_name: 'add_to_cart',
      page_url: this.getCurrentPageUrl(),
      properties: {
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_category: product.category,
      },
    })
  }

  // Track product search
  async trackProductSearch(searchTerm: string, resultsCount: number): Promise<void> {
    await this.track({
      event_type: 'search',
      event_name: 'product_search',
      page_url: this.getCurrentPageUrl(),
      properties: {
        search_term: searchTerm,
        results_count: resultsCount,
      },
    })
  }

  // Track category view
  async trackCategoryView(categoryName: string, productCount: number): Promise<void> {
    await this.track({
      event_type: 'category_view',
      event_name: 'category_viewed',
      page_url: this.getCurrentPageUrl(),
      properties: {
        category_name: categoryName,
        product_count: productCount,
      },
    })
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService(API_BASE_URL)
