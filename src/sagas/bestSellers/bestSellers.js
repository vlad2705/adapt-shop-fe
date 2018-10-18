// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'

import type { Action, Api } from '../../types'
import { fetchBestSellersFailure, fetchBestSellersSuccess } from '../../redux/bestSellers'

export function* fetchBestSellersSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.getBestSellers, action.payload)
    yield put(fetchBestSellersSuccess(response.data))
  } catch (error) {
    yield put(fetchBestSellersFailure(error.message))
  }
}