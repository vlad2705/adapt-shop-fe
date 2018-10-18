// @flow
import { createActions, handleActions } from 'redux-actions'

import initialState from './model'
import { getActionTypes } from '../../utils'

const actions = createActions(
  'FETCH_SIMILAR_PRODUCTS',
  'FETCH_SIMILAR_PRODUCTS_SUCCESS',
  'FETCH_SIMILAR_PRODUCTS_FAILURE'
)

export const {
  fetchSimilarProducts,
  fetchSimilarProductsSuccess,
  fetchSimilarProductsFailure,
} = actions

export const ActionTypes = getActionTypes(actions)

export default handleActions(
  {
    [fetchSimilarProductsSuccess]: (state, action) => action.payload,
  },
  initialState
)
