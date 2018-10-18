import sinon from 'sinon'
import { call, put } from 'redux-saga/effects'

import { fetchCategoriesSaga } from './category'
import { ActionTypes, fetchCategoriesSuccess, fetchCategoriesFailure } from '../../redux/category'

describe('category sagas', () => {
  describe('fetchCategoriesSaga', () => {
    const api = { getCategories: sinon.spy() }
    const action = { type: ActionTypes.FETCH_CATEGORIES }

    it('should handle a success response', () => {
      const saga = fetchCategoriesSaga(api, action)
      expect(saga.next().value).toEqual(call(api.getCategories))
      const response = { data: [{ id: 1, name: 'Category 1' }] }
      expect(saga.next(response).value).toEqual(put(fetchCategoriesSuccess(response.data)))
    })

    it('should handle a failure response', () => {
      const saga = fetchCategoriesSaga(api, action)
      expect(saga.next().value).toEqual(call(api.getCategories))
      const error = new Error('Failed')
      expect(saga.throw(error).value).toEqual(put(fetchCategoriesFailure(error.message)))
    })
  })
})
