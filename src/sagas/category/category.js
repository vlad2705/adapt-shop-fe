// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'

import { fetchCategoriesSuccess, fetchCategoriesFailure } from '../../redux/category'
import type { Api } from '../../types'

export function* fetchCategoriesSaga(api: Api): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.getCategories)
    yield put(fetchCategoriesSuccess(response.data))
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message))
  }
}
