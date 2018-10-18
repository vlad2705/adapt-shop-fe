// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'
import { Panel } from 'primereact/components/panel/Panel'
import { Button } from 'primereact/components/button/Button'
import { RadioButton } from 'primereact/components/radiobutton/RadioButton'
import { Toolbar } from 'primereact/components/toolbar/Toolbar'

import { Layout } from '../../../components/Layout'
import { fetchShipping } from '../../../redux/shipping'
import { acceptOrder, changeShipping, fetchOrder } from '../../../redux/order'
import type { CartState, OrderState, PictureState, ShippingState, State } from '../../../types'
import { getShipping } from '../../../redux/selectors/shipping'
import { Routes } from '../../../constants'
import { getOrder } from '../../../redux/selectors/order'
import noPicture from '../../../images/no_picture.png'

type Props = {
  acceptOrder: () => void,
  changeShipping: (shippingId: number) => void,
  fetchOrder: () => void,
  fetchShipping: () => void,
  onOrderSubmit?: () => void,
  order: OrderState,
  push: (route: string) => void,
  shipping: Array<ShippingState>,
}

type LocalState = {
  ordered: boolean,
}

export class OrderForm extends React.Component<Props, LocalState> {
  componentDidMount() {
    const { fetchOrder, fetchShipping } = this.props
    fetchOrder()
    fetchShipping()
  }

  onOrderSubmit = () => {
    const { acceptOrder, onOrderSubmit } = this.props
    acceptOrder()
    onOrderSubmit && onOrderSubmit()
  }

  imageTemplate = (picture: PictureState, productId: number) => {
    const src = picture ? `data:${picture.type};base64,${picture.content}` : noPicture
    return (
      <img
        src={src}
        onClick={() => {
        }}
        style={{ width: '100px' }}
        alt={productId}
      />
    )
  }

  props: Props

  render() {
    const { changeShipping, order = {}, push, shipping } = this.props
    const Shipping = (shipping || []).map((item: ShippingState) => (
      <React.Fragment key={item.id}>
        <div className="ui-g-10">
          <RadioButton
            label={item.name}
            value={item.id}
            onChange={(e: any) => changeShipping(+e.value)}
            checked={order.shipping && item.id === order.shipping.id}
          />
          <label htmlFor={`${item.id}`}>{item.name}</label>
        </div>
        <div className="ui-g-2" style={{ textAlign: 'right' }}>{item.cost} CZK</div>
      </React.Fragment>
    ))
    let total = order.shipping && order.shipping.cost
    const Products = (order.products || []).map((item: CartState) => {
      total += item.product.price * item.quantity
      return (
        <div key={item.id} className="ui-g-12">
          <div className="ui-g-12 ui-md-3" style={{ textAlign: 'center' }}>
            {this.imageTemplate(item.product.picture, item.product.id)}
          </div>
          <div className="ui-g-12 ui-md-9">
            <div className="ui-g">
              <div className="ui-g-12 ui-md-4" style={{ textAlign: 'center' }}>{item.product.name}</div>
              <div className="ui-g-12 ui-md-4" style={{ textAlign: 'center' }}>{item.quantity}</div>
              <div className="ui-g-12 ui-md-4" style={{ textAlign: 'right' }}>
                {item.product.price * item.quantity} CZK
              </div>
            </div>
          </div>
        </div>
      )
    })
    const orderButton = order && order.products && order.products.length > 0 && (
      <Button label="Order" icon="fa-chevron-right" iconPos="right" onClick={this.onOrderSubmit}
              style={{ width: '100% ' }}/>
    )
    return (
      <Layout>
        <div className="ui-g">
          <div className="ui-g-12 ui-md-2 ui-lg-3"/>
          <div className="ui-g-12 ui-md-8 ui-lg-6">
            <div className="ui-g">
              <div className="ui-g-12">
                <Panel header="Order">
                  <div className="ui-g">
                    {Products}
                  </div>
                </Panel>
              </div>
              <div className="ui-g-12">
                <Panel header="Shipping">
                  <div className="ui-g">
                    {Shipping}
                  </div>
                </Panel>
              </div>
              <div className="ui-g-12">
                <Toolbar>
                  <div className="ui-g-6 ui-toolbar-group-left">
                    <div className="ui-g-12">
                      Shipping
                    </div>
                    <div className="ui-g-12">
                      Total
                    </div>
                  </div>
                  <div className="ui-g-6 ui-toolbar-group-right">
                    <div className="ui-g-12" style={{ textAlign: 'right' }}>
                      {order.shipping && order.shipping.cost} CZK
                    </div>
                    <div className="ui-g-12" style={{ textAlign: 'right' }}>
                      {total} CZK
                    </div>
                  </div>
                </Toolbar>
              </div>
              <div className="ui-g-12">
                <div className="ui-g-12 ui-md-4">
                  <Button label="Back to cart" icon="fa-chevron-left" onClick={() => push(Routes.CART)}
                          style={{ width: '100%' }}/>
                </div>
                <div className="ui-g-12 ui-md-4"/>
                <div className="ui-g-12 ui-md-4">{orderButton}</div>
              </div>
            </div>
          </div>
          <div className="ui-lg-12 ui-md-2 ui-lg-3"/>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state: State) => ({
  order: getOrder(state),
  shipping: getShipping(state),
})

const mapDispatchToProps = {
  acceptOrder,
  changeShipping,
  fetchOrder,
  fetchShipping,
  push,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)