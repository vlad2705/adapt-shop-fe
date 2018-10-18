// @flow
import { createActions, handleActions } from 'redux-actions'

import initialState from './model'
import { getActionTypes } from '../../utils'

const actions = createActions(
  'FETCH_REVIEW',
  'FETCH_REVIEW_SUCCESS',
  'FETCH_REVIEW_FAILURE',
  'ADD_REVIEW',
  'ADD_REVIEW_SUCCESS',
  'ADD_REVIEW_FAILURE'
)

export const {
  fetchReview,
  fetchReviewSuccess,
  fetchReviewFailure,
  addReview,
  addReviewSuccess,
  addReviewFailure,
} = actions

export const ActionTypes = getActionTypes(actions)

export default handleActions({}, initialState)
