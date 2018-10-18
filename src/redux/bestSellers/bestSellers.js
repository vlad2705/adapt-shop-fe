// @flow
import { createActions, handleActions } from 'redux-actions'

import initialState from './model'
import { getActionTypes } from '../../utils'

const actions = createActions(
  'FETCH_BEST_SELLERS',
  'FETCH_BEST_SELLERS_SUCCESS',
  'FETCH_BEST_SELLERS_FAILURE'
)

export const { fetchBestSellers, fetchBestSellersSuccess, fetchBestSellersFailure } = actions

export const ActionTypes = getActionTypes(actions)

export default handleActions(
  {
    [fetchBestSellersSuccess]: (state, action) => action.payload,
  },
  initialState
)
