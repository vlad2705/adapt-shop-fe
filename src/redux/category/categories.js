// @flow
import { createActions, handleActions } from 'redux-actions'

import { initialCategoriesState } from './model'
import { getActionTypes } from '../../utils'

const actions = createActions(
  'FETCH_CATEGORIES',
  'FETCH_CATEGORIES_SUCCESS',
  'FETCH_CATEGORIES_FAILURE'
)

export const { fetchCategories, fetchCategoriesSuccess, fetchCategoriesFailure } = actions

export const CategoriesTypes = getActionTypes(actions)

export default handleActions(
  {
    [fetchCategoriesSuccess]: (state, action) => action.payload,
  },
  initialCategoriesState
)
