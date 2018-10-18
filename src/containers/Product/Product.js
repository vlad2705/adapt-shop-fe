// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Lightbox} from 'primereact/components/lightbox/Lightbox'
import {Button} from 'primereact/components/button/Button'
import {Growl} from 'primereact/components/growl/Growl'
import {Rating} from 'primereact/components/rating/Rating'
import { Panel } from 'primereact/components/panel/Panel'
import { DataView } from 'primereact/components/dataview/DataView'

import { Layout } from '../../components/Layout'
import { fetchProduct } from '../../redux/product'
import { Routes } from '../../constants'
import type { PictureState, ProductDetailState, ProductState, State } from '../../types'
import { getProduct } from '../../redux/selectors'
import './Product.css'
import { addProduct } from '../../redux/cart'
import noPicture from '../../images/no_picture.png'
import { fetchSimilarProducts } from '../../redux/similarProducts'
import { getSimilarProducts, getTotalSimilarProducts } from '../../redux/selectors/similarProducts'

const PAGE_SIZE = 4

type Props = {
  addProduct: (productId: number) => void,
  fetchProduct: (productId: number) => void,
  fetchSimilarProducts: () => void,
  match: {
    params: {
      productId?: string,
    },
  },
  product: ProductDetailState,
  similarProducts: Array<ProductState>,
  totalSimilarProducts: number,
  push: (route: string) => void,
}
export class Product extends React.Component<Props> {
  static defaultProps: Props = {
    similarProducts: [],
  }

  componentDidMount() {
    const { fetchProduct, fetchSimilarProducts, match: { params: { productId }}, push } = this.props
    if (productId) {
      fetchProduct(+productId)
      fetchSimilarProducts({ productId, first: 0, pageSize: PAGE_SIZE})
    } else {
      push(Routes.PRODUCTS)
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { match: { params: { productId: oldProductId }} } = this.props
    const { fetchProduct, fetchSimilarProducts, match: { params: { productId: newProductId }}, push } = nextProps
    if (oldProductId !== newProductId) {
      if (newProductId) {
        fetchProduct(+newProductId)
        fetchSimilarProducts({ productId: +newProductId, first: 0, pageSize: PAGE_SIZE})
      } else {
        push(Routes.PRODUCTS)
      }
    }
  }

  onAddToCard = (product: ProductDetailState) => {
    const { addProduct } = this.props
    addProduct(product.id)
    this.showInfo(product.name)
  }

  onLoadSimilarProducts = (e: any) => {
    const { fetchSimilarProducts, match: { params: { productId }} } = this.props
    fetchSimilarProducts({ productId: +productId, first: e.first, pageSize: e.rows })
  }

  showInfo(name: string) {
    this.growl.show({ severity: 'info', summary: 'Success', detail: `${name} was added to your cart` });
  }

  imageTemplate = (picture?: PictureState) => {
    const { match: { params: { productId } } } = this.props
    const src = picture ? `data:${picture.type};base64,${picture.content}` : noPicture
    return <img src={src} style={{ width: '350px' }} alt={productId} />
  }

  imagesTemplate = (picture: PictureState, productId: number) => {
    const src = picture ? `data:${picture.type};base64,${picture.content}` : noPicture
    return (
      <img
        src={src}
        onClick={() => this.props.push(Routes.PRODUCT_FUNC(productId))}
        style={{ width: '300px', height: '375px', cursor: 'pointer' }}
        alt={productId}
      />
    )
  }

  convertImages = (pictures?: Array<PictureState>) =>
  (pictures || []).map((picture: PictureState) => ({
    source: `data:${picture.type};base64,${picture.content}`,
    thumbnail: `data:${picture.type};base64,${picture.content}`,
  }))

  productTemplate = (product: ProductState) => {
    const { addProduct } = this.props
    return (
      <div key={product.id} className="ui-g-12 ui-md-3">
        <Panel header={product.name} style={{ textAlign: 'center' }}>
          {this.imagesTemplate(product.picture, product.id)}
          <div>{`${product.price} CZK`}</div>
          <hr className="ui-widget-content" style={{ borderTop: 0 }}/>
          <i className="fa fa-cart-plus" onClick={() => {
            addProduct(product.id)
            this.showInfo(product.name)}} style={{ cursor: 'pointer' }}/>
        </Panel>
      </div>
    )
  }

  similarProductsTemplate = () => {
    const { similarProducts, totalSimilarProducts } = this.props
    return (
      <DataView
        value={similarProducts}
        itemTemplate={this.productTemplate}
        paginator
        rows={PAGE_SIZE}
        header="Similar items"
        layout="grid"
        lazy
        onLazyLoad={this.onLoadSimilarProducts}
        totalRecords={totalSimilarProducts}
      />
    )
  }

  props: Props

  render() {
    const { product = {}, push } = this.props
    const productRating = product.rating || '0.0'
    return (
      <Layout>
        <Growl ref={(el) => { this.growl = el }} position="topleft" />
        <div className="ui-g">
          <div className="ui-g-12">
            <div className="ui-g-12 ui-lg-2" />
            <div className="ui-g-12 ui-md-6 ui-lg-4">
              <div className="ui-g">
                <div className="ui-g-12">
                  {product.pictures && this.imageTemplate(product.pictures[0])}
                </div>
                <div className="ui-g-12">
                  <Lightbox className="imgs" type="images" images={this.convertImages(product.pictures)} />
                </div>
              </div>
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-4">
              <div className="ui-g">
                <div className="ui-g-12">
                  <h1>{product.name}</h1>
                </div>
                <div className="ui-g-6 ui-md-4 ui-lg-3">
                  <Rating value={product.rating} readonly={true} stars={5} cancel={false} />
                </div>
                <div className="ui-g-4">
                  ({Math.round(+productRating * 10) / 10})&nbsp;
                  <i
                    className="fa fa-pencil"
                    onClick={() => push(Routes.REVIEW_FUNC(product.id))}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <div className="ui-g-12">{product.description}</div>
                <div className="ui-g-8"><h4>Price: </h4></div>
                <div className="ui-g-4" style={{ textAlign: 'right' }}><h4>{product.price} CZK</h4></div>
                <div className="ui-g-12" style={{ textAlign: 'right' }}>
                  <Button
                    label="Add to cart"
                    icon="fa-cart-plus"
                    onClick={() => this.onAddToCard(product)}
                  />
                </div>
              </div>
            </div>
            <div className="ui-g-12 ui-lg-2" />
            <div className="ui-g-12">
              {this.similarProductsTemplate()}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state: State) => ({
  product: getProduct(state),
  similarProducts: getSimilarProducts(state),
  totalSimilarProducts: getTotalSimilarProducts(state),
})

const mapDispatchToProps = {
  addProduct,
  fetchProduct,
  fetchSimilarProducts,
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
