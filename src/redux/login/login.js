// @flow
import { createActions, handleActions } from 'redux-actions'

import initialState from './model'
import { getActionTypes } from '../../utils'

const actions = createActions(
  'LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'LOGOUT',
  'LOGOUT_SUCCESS',
  'LOGOUT_FAILURE'
)

export const { login, loginSuccess, loginFailure, logout, logoutSuccess, logoutFailure } = actions

export const ActionTypes = getActionTypes(actions)

export default handleActions({}, initialState)
