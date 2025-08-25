import { useState } from 'react'
import { products } from '../data/mockData'
import { CartItem } from '../types'

export default function CartPage() {
  // Mock cart data - in real app this would come from state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 1 },
    { product: products[2], quantity: 1 }
  ])

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.product.id !== productId))
    } else {
      setCartItems(items => 
        items.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  const removeItem = (productId: string) => {
    setCartItems(items => items.filter(item => item.product.id !== productId))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-secondary-200 z-30">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-secondary-900">Shopping Cart</h1>
          <p className="text-sm text-secondary-600">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
          </p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-secondary-600 mb-6">
            Add some products to your cart to get started.
          </p>
          <button className="btn-primary">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row">
          {/* Cart Items */}
          <div className="flex-1 p-4">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="card p-4">
                  <div className="flex space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-secondary-900 mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-secondary-600 mb-2">
                        {item.product.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-secondary-900">
                            ${item.product.price.toFixed(2)}
                          </span>
                          {item.product.originalPrice && (
                            <span className="text-sm text-secondary-500 line-through">
                              ${item.product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-secondary-600 hover:text-secondary-900"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-secondary-600 hover:text-secondary-900"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-secondary-600">
                          Total: ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-500 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 p-4 border-t lg:border-t-0 lg:border-l border-secondary-200">
            <div className="card p-4">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-secondary-200 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full btn-primary py-3 mb-3">
                Proceed to Checkout
              </button>
              
              <button className="w-full btn-secondary py-3">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
