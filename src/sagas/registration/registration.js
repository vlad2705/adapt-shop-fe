// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'
import { initialize } from 'redux-form'

import {
  signUpSuccess, signUpFailure, fetchRegistrationDataSuccess,
  fetchRegistrationDataFailure, changeRegistrationDataSuccess, changeRegistrationDataFailure
} from '../../redux/registration'
import { login } from '../../redux/login'
import type { Action, Api } from '../../types'

export function* signUpSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.signUp, action.payload)
    yield put(signUpSuccess())
    yield put(login(response.data))
  } catch (error) {
    yield put(signUpFailure(error.message))
  }
}

export function* fetchRegistrationData(api: Api): Generator<IOEffect, void, Object> {
  try {
    const response = yield call(api.getRegistrationData)
    yield put(initialize('registration', response.data))
    yield put(fetchRegistrationDataSuccess())
  } catch (error) {
    yield put(fetchRegistrationDataFailure(error.message))
  }
}

export function* changeRegistrationDataSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    yield call(api.putChangeRegistrationData, action.payload)
    yield put(changeRegistrationDataSuccess())
  } catch (error) {
    yield put(changeRegistrationDataFailure(error.message))
  }
}