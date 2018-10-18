// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'

import type { Action, Api } from '../../types'
import { fetchRecommendedProductsFailure, fetchRecommendedProductsSuccess } from '../../redux/recommendedProducts'

export function* fetchRecommendedProductsSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.getRecommendedProducts, action.payload)
    yield put(fetchRecommendedProductsSuccess(response.data))
  } catch (error) {
    yield put(fetchRecommendedProductsFailure(error.message))
  }
}