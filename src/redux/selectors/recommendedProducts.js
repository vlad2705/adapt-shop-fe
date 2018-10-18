// @flow
import type { ProductState, State } from '../../types'

export const getRecommendedProducts = (state: State): Array<ProductState> => state.recommendedProducts.products
export const getTotalRecommendedProducts = (state: State): number => state.recommendedProducts.totalProducts
