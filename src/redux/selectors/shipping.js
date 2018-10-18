// @flow
import type { ShippingState, State } from '../../types'

export const getShipping = (state: State): Array<ShippingState> => state.shipping
