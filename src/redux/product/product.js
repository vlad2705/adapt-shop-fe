// @flow
import { createActions, handleActions } from 'redux-actions'

import { initialProductState } from './model'
import { getActionTypes } from '../../utils'

const actions = createActions('FETCH_PRODUCT', 'FETCH_PRODUCT_SUCCESS', 'FETCH_PRODUCT_FAILURE')

export const { fetchProduct, fetchProductSuccess, fetchProductFailure } = actions

export const ProductTypes = getActionTypes(actions)

export default handleActions(
  {
    [fetchProductSuccess]: (state, action) => action.payload,
  },
  initialProductState
)
