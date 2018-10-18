// @flow
import { createActions, handleActions } from 'redux-actions'

import initialState from './model'
import { Environments } from '../../constants'
import { getActionTypes } from '../../utils'

const actions = createActions('SET_ENVIRONMENT')

export const { setEnvironment } = actions

export const ActionTypes = getActionTypes(actions)

export default handleActions(
  {
    [setEnvironment]: (state, action) =>
      state.set('apiUrl', Environments[action.payload].apiUrl).set('environment', action.payload),
  },
  initialState
)
