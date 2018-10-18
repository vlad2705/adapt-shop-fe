// @flow
import { all, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects'
// $FlowFixMe
import type { IOEffect } from 'redux-saga/effects'

import createApi from '../api'
import { setEnvironment } from '../redux/config'
import { ProductsTypes, ProductTypes } from '../redux/product'
import { CategoriesTypes } from '../redux/category'
import { ActionTypes as CartTypes } from '../redux/cart'
import { ActionTypes as RegistrationTypes } from '../redux/registration'
import { ActionTypes as LoginTypes } from '../redux/login'
import { ActionTypes as ShippingTypes } from '../redux/shipping'
import { ActionTypes as OrderTypes } from '../redux/order'
import { ActionTypes as ReviewTypes } from '../redux/review'
import { ActionTypes as ViewedProductTypes } from '../redux/viewedProducts'
import { ActionTypes as RecommendedProductTypes } from '../redux/recommendedProducts'
import { ActionTypes as BestSellersTypes } from '../redux/bestSellers'
import { ActionTypes as SimilarProductsTypes } from '../redux/similarProducts'
import { getConfig } from '../redux/selectors'
import { fetchProductSaga, fetchProductsSaga, fetchProductsByFilterSaga } from './product'
import { fetchCategoriesSaga } from './category'
import { fetchCartSaga, addProductSaga, changeQuantitySaga, deleteProductSaga } from './cart'
import { changeRegistrationDataSaga, fetchRegistrationData, signUpSaga } from './registration'
import { loginSaga, logoutSaga } from './login'
import { fetchShippingSaga } from './shipping'
import { acceptOrderSaga, changeShippingSaga, fetchOrderSaga } from './order'
import { addReviewSaga, fetchReviewSaga } from './review'
import { fetchViewedProductsSaga } from './viewedProducts'
import { fetchRecommendedProductsSaga } from './recommendedProducts'
import { fetchBestSellersSaga } from './bestSellers'
import { fetchSimilarProductsSaga } from './similarProducts'

// action type which cancels a running rootSaga in cancellableSaga
const CANCEL_ROOT_SAGA = 'CANCEL_ROOT_SAGA'

// business logic saga entry point
export function* rootSaga(environment: string): Generator<IOEffect, void, Object> {
  // environment handling and API configuration
  yield put(setEnvironment(environment))

  const config = yield select(getConfig)
  const api = createApi(config)

  // run all sagas
  yield all([
    takeLatest(ProductsTypes.FETCH_PRODUCTS, fetchProductsSaga, api),
    takeLatest(ProductsTypes.FETCH_PRODUCTS_BY_FILTER, fetchProductsByFilterSaga, api),
    takeLatest(ProductTypes.FETCH_PRODUCT, fetchProductSaga, api),
    takeLatest(CategoriesTypes.FETCH_CATEGORIES, fetchCategoriesSaga, api),
    takeLatest(CartTypes.FETCH_CART, fetchCartSaga, api),
    takeLatest(CartTypes.ADD_PRODUCT, addProductSaga, api),
    takeLatest(CartTypes.CHANGE_QUANTITY, changeQuantitySaga, api),
    takeLatest(CartTypes.DELETE_PRODUCT, deleteProductSaga, api),
    takeLatest(RegistrationTypes.SIGN_UP, signUpSaga, api),
    takeLatest(RegistrationTypes.CHANGE_REGISTRATION_DATA, changeRegistrationDataSaga, api),
    takeLatest(LoginTypes.LOGIN, loginSaga, api),
    takeLatest(LoginTypes.LOGOUT, logoutSaga, api),
    takeLatest(ShippingTypes.FETCH_SHIPPING, fetchShippingSaga, api),
    takeLatest(OrderTypes.FETCH_ORDER, fetchOrderSaga, api),
    takeLatest(OrderTypes.CHANGE_SHIPPING, changeShippingSaga, api),
    takeLatest(OrderTypes.ACCEPT_ORDER, acceptOrderSaga, api),
    takeLatest(RegistrationTypes.FETCH_REGISTRATION_DATA, fetchRegistrationData, api),
    takeLatest(ReviewTypes.FETCH_REVIEW, fetchReviewSaga, api),
    takeLatest(ReviewTypes.ADD_REVIEW, addReviewSaga, api),
    takeLatest(ViewedProductTypes.FETCH_VIEWED_PRODUCTS, fetchViewedProductsSaga, api),
    takeLatest(RecommendedProductTypes.FETCH_RECOMMENDED_PRODUCTS, fetchRecommendedProductsSaga, api),
    takeLatest(BestSellersTypes.FETCH_BEST_SELLERS, fetchBestSellersSaga, api),
    takeLatest(SimilarProductsTypes.FETCH_SIMILAR_PRODUCTS, fetchSimilarProductsSaga, api),
  ])
}

// this saga is to be run by sagaMiddleware in order for HMR to work
// note that when saga HMR is enabled, changes in src/redux will also trigger the cancellation
export function* cancellableSaga(environment: string): Generator<IOEffect, void, Object> {
  // start the root saga
  const task = yield fork(rootSaga, environment)

  // cancelling mechanism
  yield take(CANCEL_ROOT_SAGA)
  yield cancel(task)
}

// default export, you should start and cancel the rootSaga via resulting sagaManager exclusively
export default function createSagaManager(store: Object) {
  return {
    cancel: () => store.dispatch({ type: CANCEL_ROOT_SAGA }),
    start: (environment: string) => store.sagaMiddleware.run(cancellableSaga, environment),
  }
}
