// @flow
import { createActions, handleActions } from 'redux-actions'

import { initialCategoryState } from './model'
import { getActionTypes } from '../../utils'

const actions = createActions('SET_CATEGORY')

export const { setCategory } = actions

export const CategoryTypes = getActionTypes(actions)

export default handleActions(
  {
    [setCategory]: (state, action) => action.payload,
  },
  initialCategoryState
)
