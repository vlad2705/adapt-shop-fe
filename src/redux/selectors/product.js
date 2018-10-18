// @flow
import type { ProductDetailState, ProductState, State } from '../../types'

export const getProducts = (state: State): Array<ProductState> => state.products.products
export const getTotalProducts = (state: State): number => state.products.totalProducts
export const getProduct = (state: State): ProductDetailState => state.product
