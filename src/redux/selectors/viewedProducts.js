// @flow
import type { ProductState, State } from '../../types'

export const getViewedProducts = (state: State): Array<ProductState> => state.viewedProducts.products
export const getTotalViewedProducts = (state: State): number => state.viewedProducts.totalProducts
