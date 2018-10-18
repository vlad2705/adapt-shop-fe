// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'
import { initialize } from 'redux-form'
import { push } from 'react-router-redux'

import { addReviewSuccess, addReviewFailure, fetchReviewSuccess, fetchReviewFailure } from '../../redux/review'
import type { Action, Api } from '../../types'
import { Routes } from '../../constants'

export function* fetchReviewSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.getReview, action.payload)
    yield put(initialize('review', response.data))
    yield put(fetchReviewSuccess())
  } catch (error) {
    yield put(fetchReviewFailure(error.message))
  }
}

export function* addReviewSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    const { productId, data } = action.payload
    yield call(api.putAddReview, productId, data)
    yield put(addReviewSuccess())
    yield put(push(Routes.PRODUCT_FUNC(productId)))
  } catch (error) {
    yield put(addReviewFailure(error.message))
  }
}