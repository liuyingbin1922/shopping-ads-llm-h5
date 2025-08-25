# Shopping H5 - E-commerce Mobile Web Application

A modern, responsive e-commerce H5 application built with React, TypeScript, and Tailwind CSS, designed for overseas business with English UI.

## Features

### 🏠 Homepage
- **Banner Carousel**: Auto-playing promotional banners with pagination
- **Category Grid**: Easy navigation to product categories
- **Product Feeds**: Multiple product sections including:
  - Featured Products (high-rated items)
  - New Arrivals
  - On Sale items
  - Category-filtered products

### 🛍️ Product Management
- **Product Cards**: Display product images, prices, ratings, and discounts
- **Product Details**: Comprehensive product pages with:
  - Image gallery with thumbnails
  - Product information and specifications
  - Rating and review display
  - Quantity selector
  - Add to cart functionality

### 🛒 Shopping Cart
- **Cart Management**: Add, remove, and update product quantities
- **Order Summary**: Calculate subtotal, shipping, tax, and total
- **Checkout Flow**: Ready for payment integration

### 👤 User Profile
- **Personal Information**: User details and account management
- **Order History**: Track past purchases
- **Settings**: App preferences and notifications
- **Address Management**: Shipping address management

### 📱 Mobile-First Design
- **Responsive Layout**: Optimized for mobile devices
- **Bottom Navigation**: Easy thumb navigation
- **Touch-Friendly**: Large touch targets and smooth interactions
- **H5 Optimized**: Fast loading and smooth scrolling

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **Routing**: React Router DOM for navigation
- **Carousel**: Swiper.js for banner and image carousels
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks for local state
- **Type Safety**: Full TypeScript implementation
- **API Integration**: RESTful API with fetch API
- **Error Handling**: Comprehensive error states and loading indicators

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend API server running on http://localhost:8000

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shopping-web-h5
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend API server (make sure it's running on http://localhost:8000):
```bash
# Your backend server should be running and accessible at:
# http://localhost:8000/api/v1/products
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3001` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BannerCarousel.tsx
│   ├── BottomNavigation.tsx
│   ├── CategoryGrid.tsx
│   ├── Layout.tsx
│   └── ProductCard.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CategoryPage.tsx
│   ├── CartPage.tsx
│   └── ProfilePage.tsx
├── data/               # Mock data and API
│   └── mockData.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── cn.ts
├── App.tsx             # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## API Integration

The application integrates with a backend API to fetch real product data:

### API Endpoints
- `GET /api/v1/products` - Fetch all products
- `GET /api/v1/products/:id` - Fetch single product
- `GET /api/v1/products?category=:category` - Fetch products by category

### Product Data Structure
```typescript
interface Product {
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
```

### Error Handling
- Loading states for all API calls
- Error messages for failed requests
- Retry functionality
- Fallback to placeholder images when image_url is null

## Key Components

### BannerCarousel
- Auto-playing promotional banners
- Pagination indicators
- Responsive design
- Touch/swipe support

### ProductCard
- Product image display
- Price and stock information
- Rating display (default values)
- Quick add to cart button
- Hover effects and animations

### BottomNavigation
- Mobile-optimized navigation
- Active state indicators
- Smooth transitions
- Icon-based navigation

## Design System

### Colors
- **Primary**: Orange (#ed7519) - Main brand color
- **Secondary**: Gray scale - Text and backgrounds
- **Accent**: Red (#ef4444) - Sales and discounts

### Typography
- **Font Family**: Inter - Modern, readable font
- **Responsive**: Scales appropriately for mobile devices

### Spacing
- **Consistent**: 4px base unit system
- **Mobile-First**: Optimized for touch interactions

## Internationalization

The application is designed for overseas business with:
- All UI text in English
- Currency in USD format
- Mobile-first responsive design
- Touch-optimized interactions

## Future Enhancements

- [ ] State management with Redux/Zustand
- [ ] User authentication and authorization
- [ ] Payment gateway integration
- [ ] Real API integration
- [ ] Search functionality
- [ ] Wishlist feature
- [ ] Push notifications
- [ ] Offline support with PWA
- [ ] Multi-language support
- [ ] Advanced filtering and sorting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
