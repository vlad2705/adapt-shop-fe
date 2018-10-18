import reducer, { setEnvironment } from './'
import initialState from './model'
import { Environments } from '../../constants'

describe('config reducer', () => {
  it('returns the initial state', () => {
    const state = reducer(initialState, {})
    expect(state).toEqual(initialState)
  })

  it('handles setEnvironment', () => {
    const state = reducer(initialState, setEnvironment('DEV'))
    expect(state).toEqual({
      apiUrl: Environments.DEV.apiUrl,
      environment: 'DEV',
    })
  })
})

describe('config actions', () => {
  describe('setEnvironment', () => {
    it('has proper payload', () => {
      expect(setEnvironment('DEV').payload).toEqual('DEV')
    })
  })
})
