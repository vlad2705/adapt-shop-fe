// @flow
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'
import logger from '@prague-digi/redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import configReducer from './config'
import cartReducer from './cart'
import { categoryReducer, categoriesReducer } from './category'
import { productReducer, productsReducer } from './product'
import shippingReducer from './shipping'
import orderReducer from './order'
import viewedProductReducer from './viewedProducts'
import recommendedProductReducer from './recommendedProducts'
import bestSellerReducer from './bestSellers'
import similarProductReducer from './similarProducts'

export const history = createHistory()

export const reducer = combineReducers({
  config: configReducer,
  cart: cartReducer,
  category: categoryReducer,
  categories: categoriesReducer,
  form: formReducer,
  product: productReducer,
  products: productsReducer,
  shipping: shippingReducer,
  order: orderReducer,
  viewedProducts: viewedProductReducer,
  recommendedProducts: recommendedProductReducer,
  bestSellers: bestSellerReducer,
  similarProducts: similarProductReducer,
  routing: routerReducer,
})

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const middleware = []
  const sagaMiddleware = createSagaMiddleware()

  middleware.push(sagaMiddleware)
  middleware.push(logger)
  middleware.push(routerMiddleware(history))

  const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)))

  // sagaMiddleware is exposed because of our saga HMR
  // $FlowFixMe
  store.sagaMiddleware = sagaMiddleware

  return store
}
