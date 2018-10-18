// @flow
// Common API endpoint definition
// Naming convention = constant-case API method names, e.g. api.getFoo uses GET_FOO constant
export default {
  GET_CART: '/api/cart',
  GET_CATEGORIES: '/api/categories',
  GET_PRODUCTS: '/api/products',
  GET_VIEWED_PRODUCTS: '/api/products/viewed',
  GET_RECOMMENDED_PRODUCTS: '/api/products/recommended',
  GET_BEST_SELLERS: '/api/products/best_sellers',
  GET_SIMILAR_PRODUCTS: (productId: number) => `/api/product/${productId}/similar`,
  GET_PRODUCT: (productId: number) => `/api/product/${productId}`,
  GET_SHIPPING: '/api/shipping',
  GET_ORDER: '/api/product_order',
  GET_REGISTRATION_DATA: '/api/registration',
  GET_REVIEW: (productId: number) => `/api/product/${productId}/review`,
  POST_ADD_PRODUCT: '/api/cart/product',
  SIGN_UP: '/api/sign-up',
  CHANGE_REGISTRATION_DATA: '/api/change_registration_data',
  ADD_REVIEW: (productId: number) => `/api/product/${productId}/review`,
  LOGIN: '/login',
  LOGOUT: '/logout',
  PATCH_CHANGE_QUANTITY: (productId: number, quantity: number) =>
    `/api/cart/product/${productId}/quantity/${quantity}`,
  PATCH_CHANGE_SHIPPING: (shippingId: number) => `/api/change_shipping/${shippingId}`,
  PATCH_ACCEPT_ORDER: '/api/product_order/accept',
  DELETE_PRODUCT: (productId: number) => `/api/cart/product/${productId}`,
}
