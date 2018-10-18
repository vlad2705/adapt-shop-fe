// @flow
import type { ReviewState, State } from '../../types'

export const getReviewForm = (state: State): ReviewState =>
  state.form.review && state.form.review.values
