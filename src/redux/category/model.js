// @flow
import Immutable from 'seamless-immutable'

import type { CategoryState } from '../../types'

export const initialCategoryState: Immutable<?number> = Immutable(null)

export const initialCategoriesState: Immutable<Array<CategoryState>> = Immutable([])