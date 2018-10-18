// @flow
import type { ProductState, State } from '../../types'

export const getSimilarProducts = (state: State): Array<ProductState> => state.similarProducts.products
export const getTotalSimilarProducts = (state: State): number => state.similarProducts.totalProducts
