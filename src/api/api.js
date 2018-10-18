// @flow
import axios from 'axios'

import { Endpoints } from '../constants'
import type { ConfigState, LoginState, ProductFilterState, RegistrationState, ReviewState } from '../types'

const createApi = (config: ConfigState) => {
  const api = axios.create({ baseURL: config.apiUrl })
  api.defaults.headers.common['Authorization'] = localStorage.getItem('token')

  return {
    setAuthorization: (token: string) => api.defaults.headers.common['Authorization'] = token,
    getCart: () => api.get(Endpoints.GET_CART),
    getCategories: () => api.get(Endpoints.GET_CATEGORIES),
    getProducts: () => api.get(Endpoints.GET_PRODUCTS),
    getViewedProducts: (filter: ProductFilterState) => api.get(Endpoints.GET_VIEWED_PRODUCTS, { params: filter }),
    getRecommendedProducts: (filter: ProductFilterState) => api.get(Endpoints.GET_RECOMMENDED_PRODUCTS, { params: filter }),
    getBestSellers: (filter: ProductFilterState) => api.get(Endpoints.GET_BEST_SELLERS, { params: filter }),
    getSimilarProducts: (productId: number, filter: ProductFilterState) => api.get(Endpoints.GET_SIMILAR_PRODUCTS(productId), { params: filter }),
    getProduct: (productId: number) => api.get(Endpoints.GET_PRODUCT(productId)),
    getProductsByFilter: (filter: ProductFilterState) => api.get(Endpoints.GET_PRODUCTS, { params: filter }),
    getShipping: () => api.get(Endpoints.GET_SHIPPING),
    getOrder: () => api.get(Endpoints.GET_ORDER),
    getRegistrationData: () => api.get(Endpoints.GET_REGISTRATION_DATA),
    getReview: (productId: number) => api.get(Endpoints.GET_REVIEW(productId)),
    postAddProduct: (productId: number) => api.post(`${Endpoints.POST_ADD_PRODUCT}/${productId}`),
    signUp: (data: RegistrationState) => api.post(Endpoints.SIGN_UP, data),
    putChangeRegistrationData: (data: RegistrationState) => api.put(Endpoints.CHANGE_REGISTRATION_DATA, data),
    putAddReview: (productId: number, data: ReviewState) => api.put(Endpoints.ADD_REVIEW(productId), data),
    login: (data: LoginState) => api.post(Endpoints.LOGIN, data),
    patchChangeQuantity: (productId: number, quantity: number) => api.patch(Endpoints.PATCH_CHANGE_QUANTITY(productId, quantity)),
    patchChangeShipping: (shippingId: number) => api.patch(Endpoints.PATCH_CHANGE_SHIPPING(shippingId)),
    patchAcceptOrder: () => api.patch(Endpoints.PATCH_ACCEPT_ORDER),
    deleteProduct: (productId: number) => api.delete(Endpoints.DELETE_PRODUCT(productId)),
  }
}

export default createApi
