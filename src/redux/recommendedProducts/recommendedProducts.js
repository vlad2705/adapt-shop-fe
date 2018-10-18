// @flow
import { createActions, handleActions } from 'redux-actions'

import initialState from './model'
import { getActionTypes } from '../../utils'

const actions = createActions(
  'FETCH_RECOMMENDED_PRODUCTS',
  'FETCH_RECOMMENDED_PRODUCTS_SUCCESS',
  'FETCH_RECOMMENDED_PRODUCTS_FAILURE'
)

export const {
  fetchRecommendedProducts,
  fetchRecommendedProductsSuccess,
  fetchRecommendedProductsFailure,
} = actions

export const ActionTypes = getActionTypes(actions)

export default handleActions(
  {
    [fetchRecommendedProductsSuccess]: (state, action) => action.payload,
  },
  initialState
)
