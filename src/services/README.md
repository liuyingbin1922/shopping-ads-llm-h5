# Analytics Service 使用说明

## 概述

Analytics Service 提供了完整的用户行为埋点功能，支持页面访问、产品交互、购物车操作等事件的追踪。

## 基础埋点接口

所有埋点数据都会发送到以下接口：
```
POST /api/v1/analytics/track
```

## 支持的事件类型

### 1. 页面访问埋点
```typescript
// 追踪页面访问
await analyticsService.trackPageView('homepage', {
  total_products: 100,
  categories_count: 8
})
```

### 2. 产品相关埋点
```typescript
// 追踪产品查看
await analyticsService.trackProductView({
  id: 1,
  name: 'Product Name',
  price: 99.99,
  category: 'Electronics'
})

// 追踪产品卡片点击
await analyticsService.trackProductCardClick({
  id: 1,
  name: 'Product Name',
  price: 99.99,
  category: 'Electronics'
})

// 追踪添加到购物车
await analyticsService.trackAddToCart({
  id: 1,
  name: 'Product Name',
  price: 99.99,
  category: 'Electronics'
})
```

### 3. 分类相关埋点
```typescript
// 追踪分类查看
await analyticsService.trackCategoryView('Electronics', 25)
```

### 4. 搜索相关埋点
```typescript
// 追踪产品搜索
await analyticsService.trackProductSearch('laptop', 15)
```

### 5. 自定义埋点
```typescript
// 追踪自定义事件
await analyticsService.track({
  event_type: 'custom_event',
  event_name: 'button_clicked',
  page_url: window.location.href,
  properties: {
    button_name: 'subscribe',
    section: 'newsletter'
  }
})
```

## 自动收集的数据

每个埋点事件都会自动包含以下信息：
- `user_id`: 用户唯一标识（自动生成并存储在localStorage）
- `session_id`: 会话唯一标识（每次页面加载生成）
- `timestamp`: 事件发生时间（ISO格式）
- `page_url`: 当前页面URL

## 错误处理

埋点服务具有完善的错误处理机制：
- 网络错误不会影响用户体验
- 所有错误都会在控制台输出
- 埋点失败不会中断应用功能

## 使用示例

### 在组件中使用
```typescript
import { analyticsService } from '../services/analytics'

// 在useEffect中追踪页面访问
useEffect(() => {
  analyticsService.trackPageView('product_detail', {
    product_id: product.id
  })
}, [])

// 在事件处理函数中追踪用户行为
const handleAddToCart = async () => {
  await analyticsService.trackAddToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category
  })
  // 执行添加到购物车逻辑
}
```

## 注意事项

1. 所有埋点调用都是异步的，建议使用 `await` 或 `.then()` 处理
2. 埋点数据会发送到 `http://localhost:8000/api/v1/analytics/track`
3. 确保后端服务正在运行，否则埋点会失败但不影响用户体验
4. 用户ID和会话ID会自动管理，无需手动设置
