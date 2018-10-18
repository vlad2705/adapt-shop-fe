// @flow
import { createActions, handleActions } from 'redux-actions'

import initialState from './model'
import { getActionTypes } from '../../utils'

const actions = createActions(
  'FETCH_ORDER',
  'FETCH_ORDER_SUCCESS',
  'FETCH_ORDER_FAILURE',
  'CHANGE_SHIPPING',
  'CHANGE_SHIPPING_SUCCESS',
  'CHANGE_SHIPPING_FAILURE',
  'ACCEPT_ORDER',
  'ACCEPT_ORDER_SUCCESS',
  'ACCEPT_ORDER_FAILURE'
)

export const {
  fetchOrder,
  fetchOrderSuccess,
  fetchOrderFailure,
  changeShipping,
  changeShippingSuccess,
  changeShippingFailure,
  acceptOrder,
  acceptOrderSuccess,
  acceptOrderFailure,
} = actions

export const ActionTypes = getActionTypes(actions)

export default handleActions(
  {
    [fetchOrderSuccess]: (state, action) => action.payload,
  },
  initialState
)
