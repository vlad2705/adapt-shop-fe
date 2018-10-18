// @flow
import { createActions, handleActions } from 'redux-actions'

import { initialProductsState } from './model'
import { getActionTypes } from '../../utils'

const actions = createActions(
  'FETCH_PRODUCTS',
  'FETCH_PRODUCTS_SUCCESS',
  'FETCH_PRODUCTS_FAILURE',
  'FETCH_PRODUCTS_BY_FILTER'
)

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductsByFilter,
} = actions

export const ProductsTypes = getActionTypes(actions)

export default handleActions(
  {
    [fetchProductsSuccess]: (state, action) => action.payload,
  },
  initialProductsState
)
