import sinon from 'sinon'
import { call, put } from 'redux-saga/effects'

import { fetchProductsSaga } from './product'
import { ActionTypes, fetchProductsSuccess, fetchProductsFailure } from '../../redux/product'

describe('product sagas', () => {
  describe('fetchProductsSaga', () => {
    const api = { getProducts: sinon.spy() }
    const action = { type: ActionTypes.FETCH_PRODUCTS }

    it('should handle a success response', () => {
      const saga = fetchProductsSaga(api, action)
      expect(saga.next().value).toEqual(call(api.getProducts))
      const response = { data: [{ id: 1, name: 'Product 1' }] }
      expect(saga.next(response).value).toEqual(put(fetchProductsSuccess(response.data)))
    })

    it('should handle a failure response', () => {
      const saga = fetchProductsSaga(api, action)
      expect(saga.next().value).toEqual(call(api.getProducts))
      const error = new Error('Failed')
      expect(saga.throw(error).value).toEqual(put(fetchProductsFailure(error.message)))
    })
  })
})
