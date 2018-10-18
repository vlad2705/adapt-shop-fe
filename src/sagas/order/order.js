// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'

import {
  changeShippingSuccess,
  changeShippingFailure,
  fetchOrderSuccess,
  fetchOrderFailure, acceptOrderSuccess, acceptOrderFailure,
} from '../../redux/order'
import type { Action, Api } from '../../types'

export function* fetchOrderSaga(api: Api): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.getOrder)
    yield put(fetchOrderSuccess(response.data))
  } catch (error) {
    yield put(fetchOrderFailure(error.message))
  }
}

export function* changeShippingSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    yield call(api.patchChangeShipping, action.payload)
    yield put(changeShippingSuccess())
    yield call(fetchOrderSaga, api)
  } catch (error) {
    yield put(changeShippingFailure(error.message))
  }
}

export function* acceptOrderSaga(api: Api): Generator<IOEffect, void, Object> {
  try {
    yield call(api.patchAcceptOrder)
    yield put(acceptOrderSuccess())
  } catch (error) {
    yield put(acceptOrderFailure(error.message))
  }
}