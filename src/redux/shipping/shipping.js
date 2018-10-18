// @flow
import { createActions, handleActions } from 'redux-actions'

import initialState from './model'
import { getActionTypes } from '../../utils'

const actions = createActions('FETCH_SHIPPING', 'FETCH_SHIPPING_SUCCESS', 'FETCH_SHIPPING_FAILURE')

export const { fetchShipping, fetchShippingSuccess, fetchShippingFailure } = actions

export const ActionTypes = getActionTypes(actions)

export default handleActions(
  {
    [fetchShippingSuccess]: (state, action) => action.payload,
  },
  initialState
)
