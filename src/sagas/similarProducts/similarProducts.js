// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'

import type { Action, Api } from '../../types'
import { fetchSimilarProductsSuccess, fetchSimilarProductsFailure } from '../../redux/similarProducts'

export function* fetchSimilarProductsSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    const { productId, ...otherProps } = action.payload
    const response = yield call(api.getSimilarProducts, productId, {...otherProps})
    yield put(fetchSimilarProductsSuccess(response.data))
  } catch (error) {
    yield put(fetchSimilarProductsFailure(error.message))
  }
}