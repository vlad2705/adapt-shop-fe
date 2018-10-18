// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'

import type { Action, Api } from '../../types'
import { fetchViewedProductsFailure, fetchViewedProductsSuccess } from '../../redux/viewedProducts'

export function* fetchViewedProductsSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.getViewedProducts, action.payload)
    yield put(fetchViewedProductsSuccess(response.data))
  } catch (error) {
    yield put(fetchViewedProductsFailure(error.message))
  }
}