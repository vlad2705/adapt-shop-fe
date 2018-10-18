// @flow
import * as React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'

import { OrderForm } from './OrderForm'
import { OrderSuccess } from './OrderSuccess'

type LocalState = {
  ordered: boolean,
}

export class Order extends React.Component<LocalState> {
  state = {
    ordered: false,
  }

  render() {
    const { ordered } = this.state
    return ordered ? <OrderSuccess /> : <OrderForm onOrderSubmit={() => this.setState({ ordered: true })} />
  }
}

export default Order
