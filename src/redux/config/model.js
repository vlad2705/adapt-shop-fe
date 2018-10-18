// @flow
import Immutable from 'seamless-immutable'

import type { ConfigState } from '../../types'

const initialState: Immutable<ConfigState> = Immutable({
  apiUrl: '',
  environment: '',
})

export default initialState
