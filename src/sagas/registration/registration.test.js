// @flow
import { call, put } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'

import { signUpSuccess, signUpFailure } from '../../redux/registration'
import type { Action, Api } from '../../types'

export function* signUpSaga(api: Api, action: Action): Generator<IOEffect, void, Object> {
  try {
    yield call(api.signUp, action.payload)
    yield put(signUpSuccess())
  } catch (error) {
    yield put(signUpFailure(error.message))
  }
}