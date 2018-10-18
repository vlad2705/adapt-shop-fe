// @flow
import type { CartState, State } from '../../types'

export const getCart = (state: State): Array<CartState> => state.cart
