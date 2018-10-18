// @flow
import type { OrderState, State } from '../../types'

export const getOrder = (state: State): OrderState => state.order
