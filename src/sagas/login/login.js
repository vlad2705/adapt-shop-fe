// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { loginSuccess, loginFailure, logoutSuccess, logoutFailure } from '../../redux/login'
import type { Action, Api } from '../../types'
import { Routes } from '../../constants'

export function* loginSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.login, action.payload)
    const token = response.headers.authorization
    localStorage.setItem('token', token)
    api.setAuthorization(response.headers.authorization)
    yield put(loginSuccess())
    yield put(push(Routes.PRODUCTS))
  } catch (error) {
    yield put(loginFailure(error.message))
  }
}

export function* logoutSaga(api: Api): Generator<IOEffect, void, Object> {
  try {
    localStorage.removeItem('token')
    api.setAuthorization()
    yield put(logoutSuccess())
    yield put(push(Routes.PRODUCTS))
    yield put(window.location.reload())
  } catch (error) {
    yield put(logoutFailure(error.message))
  }
}