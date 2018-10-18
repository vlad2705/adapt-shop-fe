// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'
import { DataList } from 'primereact/components/datalist/DataList'
import {Spinner} from 'primereact/components/spinner/Spinner'
import {Button} from 'primereact/components/button/Button'
import { Toolbar } from 'primereact/components/toolbar/Toolbar'

import type { CartState, PictureState } from '../../types'
import { getCart } from '../../redux/selectors'
import { changeQuantity, deleteProduct, fetchCart } from '../../redux/cart'
import { Routes } from '../../constants'
import { Layout } from '../../components/Layout'
import noPicture from '../../images/no_picture.png'

type Props = {
  items: Array<CartState>,
  changeQuantity: (productId: number, quantity: number) => void,
  deleteProduct: (productId: number) => void,
  fetchCart: () => void,
  push: (route: string) => void,
}

export class Cart extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchCart()
  }

  imageTemplate = (picture: PictureState, productId: number) => {
    const src = picture ? `data:${picture.type};base64,${picture.content}` : noPicture
    return (
      <img
        src={src}
        onClick={() => this.props.push(Routes.PRODUCT_FUNC(productId))}
        style={{ width: '100px', cursor: 'pointer' }}
        alt={productId}
      />
    )
  }

  productTemplate = (item: CartState) => (
    <div className="ui-g ui-fluid">
      <div className="ui-g-12 ui-md-3">
        {this.imageTemplate(item.product.picture, item.product.id)}
      </div>
      <div className="ui-g-12 ui-md-9">
        <div className="ui-g">
          <div className="ui-g-12 ui-md-3">{item.product.name}</div>
          <div className="ui-g-4 ui-md-3">
            <Spinner value={item.quantity} min={1} max={100} onChange={(e: any) => this.props.changeQuantity({productId: item.product.id, quantity: e.value})} />
          </div>
          <div className="ui-g-4 ui-md-3">{item.product.price * item.quantity} CZK</div>

          <div className="ui-g-4 ui-md-3">
            <i className="fa fa-trash" aria-hidden="true" onClick={() => this.props.deleteProduct(item.product.id)} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </div>
  )

  props: Props

  render() {
    const { items, push } = this.props
    let total = 0;
    (items || []).forEach((item: CartState) => {
      total += item.product.price * item.quantity
    })
    const orderButton = items && items.length > 0 && (
        <Button label="Check out" icon="fa-chevron-right" iconPos="right" onClick={() => push(Routes.ORDER)} style={{ width: '100%' }} />
    )
    return (
      <Layout>
        <div className="ui-g">
          <div className="ui-g-12 ui-md-2 ui-lg-3"/>
          <div className="ui-g-12 ui-md-8 ui-lg-6">
            <div className="ui-g">
              <div className="ui-g-12">
                <DataList value={items} itemTemplate={this.productTemplate} header="Cart"/>
              </div>
              <div className="ui-g-12">
                <Toolbar>
                  <div className="ui-g-6 ui-toolbar-group-left">
                    <div className="ui-g-12">
                      Total
                    </div>
                  </div>
                  <div className="ui-g-6 ui-toolbar-group-right">
                    <div className="ui-g-8"  style={{ textAlign: 'center' }}>
                      {total} CZK
                    </div>
                    <div className="ui-g-4" />
                  </div>
                </Toolbar>
              </div>
              <div className="ui-g-12 ui-md-4">
                <Button label="Back to shopping" icon="fa-chevron-left" onClick={() => push(Routes.PRODUCTS)} style={{ width: '100%' }} />
              </div>
              <div className="ui-g-12 ui-md-4" />
              <div className="ui-g-12 ui-md-4">
                {orderButton}
              </div>
            </div>
            </div>
        </div>
      </Layout>
    )
  }

}

// istanbul ignore next
const mapStateToProps = (state: State) => ({
  items: getCart(state),
})

// istanbul ignore next
const mapDispatchToProps = {
  fetchCart,
  changeQuantity,
  deleteProduct,
  push,
}

// istanbul ignore next
export default connect(mapStateToProps, mapDispatchToProps)(Cart)