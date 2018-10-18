// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { fetchProductsSuccess, fetchProductsFailure } from '../../redux/product'
import type { Action, Api } from '../../types'
import { fetchProductFailure, fetchProductSuccess } from '../../redux/product'
import { Routes } from '../../constants'
import { setCategory } from '../../redux/category'

export function* fetchProductsSaga(api: Api): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.getProducts)
    yield put(fetchProductsSuccess(response.data))
  } catch (error) {
    yield put(fetchProductsFailure(error.message))
  }
}

export function* fetchProductsByFilterSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    const { categoryId } = action.payload
    const response = yield call(api.getProductsByFilter, action.payload)
    yield put(setCategory(categoryId))
    yield put(fetchProductsSuccess(response.data))
  } catch (error) {
    yield put(fetchProductsFailure(error.message))
  }
}

export function* fetchProductSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.getProduct, action.payload)
    yield put(fetchProductSuccess(response.data))
  } catch (error) {
    yield put(fetchProductFailure(error.message))
    yield put(push(Routes.PRODUCTS))
  }
}
