// @flow
import { createActions, handleActions } from 'redux-actions'

import initialState from './model'
import { getActionTypes } from '../../utils'

const actions = createActions(
  'FETCH_CART',
  'FETCH_CART_SUCCESS',
  'FETCH_CART_FAILURE',
  'ADD_PRODUCT',
  'ADD_PRODUCT_SUCCESS',
  'ADD_PRODUCT_FAILURE',
  'CHANGE_QUANTITY',
  'CHANGE_QUANTITY_SUCCESS',
  'CHANGE_QUANTITY_FAILURE',
  'DELETE_PRODUCT',
  'DELETE_PRODUCT_SUCCESS',
  'DELETE_PRODUCT_FAILURE'
)

export const {
  fetchCart,
  fetchCartSuccess,
  fetchCartFailure,
  addProduct,
  addProductSuccess,
  addProductFailure,
  changeQuantity,
  changeQuantitySuccess,
  changeQuantityFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
} = actions

export const ActionTypes = getActionTypes(actions)

export default handleActions(
  {
    [fetchCartSuccess]: (state, action) => action.payload,
  },
  initialState
)
