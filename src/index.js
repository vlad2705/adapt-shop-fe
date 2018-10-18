import React from 'react'
import type { ComponentType } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import errorHandler from '@prague-digi/error-handler'

import './index.css'
import App from './containers/App/App'
import configureStore from './redux'
import createSagaManager from './sagas'

// Global error handler (listening to the error event of window), passing error.message to callback
errorHandler(alert)

const store = configureStore()
// Environment would probably be set using something like process.env.NODE_ENV
const environment = 'DEV'
// Start all sagas with the API configured according to the environment
createSagaManager(store).start(environment)

export const render = (Component: ComponentType<any>) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  )
}

render(App)

// istanbul ignore next
if (module.hot) {
  // React HMR
  module.hot.accept('./containers/App', () => {
    render(App)
  })

  // Reducer HMR
  module.hot.accept('./redux', () => {
    store.replaceReducer(require('./redux').reducer)
  })

  // Saga HMR, note that when enabled, changes in ./redux will also trigger the reload
  module.hot.accept('./sagas', () => {
    const nextSagaManager = require('./sagas').default(store)
    nextSagaManager.cancel()
    nextSagaManager.start(environment)
  })
}
