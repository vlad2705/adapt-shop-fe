// @flow
// React Router path definition
// Naming convention = constant-case page container names, e.g. containers/Home uses HOME
export default {
  CART: '/cart',
  PRODUCTS: '/',
  REGISTRATION: '/sign-up',
  LOGIN: '/login',
  ORDER: '/order',
  PRODUCT: '/product/:productId',
  REVIEW: '/product/:productId/review',
  PRODUCT_FUNC: (productId: number) => `/product/${productId}`,
  REVIEW_FUNC: (productId: number) => `/product/${productId}/review`,
}
