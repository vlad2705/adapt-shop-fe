// @flow
import { createActions, handleActions } from 'redux-actions'

import initialState from './model'
import { getActionTypes } from '../../utils'

const actions = createActions(
  'FETCH_VIEWED_PRODUCTS',
  'FETCH_VIEWED_PRODUCTS_SUCCESS',
  'FETCH_VIEWED_PRODUCTS_FAILURE'
)

export const {
  fetchViewedProducts,
  fetchViewedProductsSuccess,
  fetchViewedProductsFailure,
} = actions

export const ActionTypes = getActionTypes(actions)

export default handleActions(
  {
    [fetchViewedProductsSuccess]: (state, action) => action.payload,
  },
  initialState
)
