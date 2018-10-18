// @flow
import type { ProductState, State } from '../../types'

export const getBestSellers = (state: State): Array<ProductState> => state.bestSellers.products
export const getTotalBestSellers = (state: State): number => state.bestSellers.totalProducts
