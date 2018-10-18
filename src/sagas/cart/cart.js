// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'

import {
  fetchCartSuccess, fetchCartFailure, addProductSuccess, addProductFailure,
  changeQuantitySuccess, changeQuantityFailure, fetchCart, deleteProductSuccess, deleteProductFailure
} from '../../redux/cart'
import type { Action, Api } from '../../types'

export function* fetchCartSaga(api: Api): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.getCart)
    yield put(fetchCartSuccess(response.data))
  } catch (error) {
    yield put(fetchCartFailure(error.message))
  }
}

export function* addProductSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    yield call(api.postAddProduct, action.payload)
    yield put(addProductSuccess())
  } catch (error) {
    yield put(addProductFailure(error.message))
  }
}

export function* changeQuantitySaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    const { productId, quantity } = action.payload
    yield call(api.patchChangeQuantity, productId, quantity)
    yield put(changeQuantitySuccess())
    yield put(fetchCart())
  } catch (error) {
    yield put(changeQuantityFailure(error.message))
  }
}

export function* deleteProductSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    yield call(api.deleteProduct, action.payload)
    yield put(deleteProductSuccess())
    yield put(fetchCart())
  } catch (error) {
    yield put(deleteProductFailure(error.message))
  }
}
