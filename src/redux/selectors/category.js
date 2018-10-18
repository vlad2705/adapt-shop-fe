// @flow
import type { CategoryState, State } from '../../types'

export const getCategories = (state: State): Array<CategoryState> => state.categories
export const getCategory = (state: State): Array<CategoryState> => state.category
