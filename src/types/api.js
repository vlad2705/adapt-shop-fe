// @flow
// All API related custom types should be located here: request and response shapes, etc.
import type { LoginState, ProductFilterState, RegistrationState, ReviewState } from './redux'

export type Api = {
  login: (data: LoginState) => mixed,
  signUp: (data: RegistrationState) => mixed,
  setAuthorization: (token: string) => void,
  getCart: () => mixed,
  getCategories: () => mixed,
  getProducts: () => mixed,
  getViewedProducts: (filter: ProductFilterState => mixed,
  getRecommendedProducts: (filter: ProductFilterState => mixed,
  getBestSellers: (filter: ProductFilterState => mixed,
  getSimilarProducts: (productId: number, filter: ProductFilterState => mixed,
  getProduct: (productId: number) => mixed,
  getProductsByFilter: (filter: ProductFilterState) => mixed,
  getShipping: () => mixed,
  getOrder: () => mixed,
  getRegistrationData: () => mixed,
  getReview: (productId: number) => mixed,
  postAddProduct: (productId: number) => mixed,
  putChangeRegistrationData: (data: RegistrationState) => mixed,
  putAddReview: (productId: number, data: ReviewState) => mixed,
  patchChangeQuantity: (productId: number, quantity: number) => mixed,
  patchChangeShipping: (shippingId: number) => mixed,
  patchAcceptOrder: () => mixed,
  deleteProduct: (productId: number) => mixed,
}
