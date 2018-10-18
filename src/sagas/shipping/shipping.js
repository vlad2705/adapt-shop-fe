// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'

import { fetchShippingSuccess, fetchShippingFailure } from '../../redux/shipping'
import type { Api } from '../../types'

export function* fetchShippingSaga(api: Api): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.getShipping)
    yield put(fetchShippingSuccess(response.data))
  } catch (error) {
    yield put(fetchShippingFailure(error.message))
  }
}