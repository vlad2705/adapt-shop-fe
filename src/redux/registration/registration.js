// @flow
import { createActions, handleActions } from 'redux-actions'

import initialState from './model'
import { getActionTypes } from '../../utils'

const actions = createActions(
  'SIGN_UP',
  'SIGN_UP_SUCCESS',
  'SIGN_UP_FAILURE',
  'FETCH_REGISTRATION_DATA',
  'FETCH_REGISTRATION_DATA_SUCCESS',
  'FETCH_REGISTRATION_DATA_FAILURE',
  'CHANGE_REGISTRATION_DATA',
  'CHANGE_REGISTRATION_DATA_SUCCESS',
  'CHANGE_REGISTRATION_DATA_FAILURE'
)

export const {
  signUp,
  signUpSuccess,
  signUpFailure,
  fetchRegistrationData,
  fetchRegistrationDataSuccess,
  fetchRegistrationDataFailure,
  changeRegistrationData,
  changeRegistrationDataSuccess,
  changeRegistrationDataFailure,
} = actions

export const ActionTypes = getActionTypes(actions)

export default handleActions({}, initialState)
