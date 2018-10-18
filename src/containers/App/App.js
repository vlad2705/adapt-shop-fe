import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import { history } from '../../redux/configureStore'
import { Routes } from '../../constants'
import './App.css'
import { Products } from '../Products'
import { Registration } from '../Registration'
import { Login } from '../Login'
import { Cart } from '../Cart'
import { Order } from '../Order'
import { Product } from '../Product'
import { Review } from '../Review'

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path={Routes.PRODUCTS} component={Products} />
      <Route exact path={Routes.CART} component={Cart} />
      <Route exact path={Routes.REGISTRATION} component={Registration} />
      <Route exact path={Routes.LOGIN} component={Login} />
      <Route exact path={Routes.ORDER} component={Order} />
      <Route exact path={Routes.PRODUCT} component={Product} />
      <Route exact path={Routes.REVIEW} component={Review} />
    </Switch>
  </Router>
)

export default App
