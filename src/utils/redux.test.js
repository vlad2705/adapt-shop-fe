import { getActionTypes } from '.'

describe('redux utils', () => {
  describe('getActionTypes', () => {
    it('handles strings', () => {
      const actions = {
        setName: 'SET_NAME',
        getName: 'GET_NAME',
      }

      expect(getActionTypes(actions)).toEqual({
        SET_NAME: 'SET_NAME',
        GET_NAME: 'GET_NAME',
      })
    })

    it('handles objects', () => {
      const actions = {
        setName: {
          toString: () => 'SET_NAME',
        },
        getName: {
          toString: () => 'GET_NAME',
        },
      }

      expect(getActionTypes(actions)).toEqual({
        SET_NAME: 'SET_NAME',
        GET_NAME: 'GET_NAME',
      })
    })
  })
})
