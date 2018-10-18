// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'
import { Panel } from 'primereact/components/panel/Panel'
import { DataView } from 'primereact/components/dataview/DataView'
import {Growl} from 'primereact/components/growl/Growl'

import type { CategoryState, PictureState, ProductState } from '../../types'
import { fetchProductsByFilter } from '../../redux/product'
import { fetchCategories } from '../../redux/category'
import { addProduct } from '../../redux/cart'
import { convertToMenuState } from '../../redux/category/converter'
import { Layout } from '../../components/Layout'
import {
  getProducts,
  getCategories,
  getTotalProducts,
  getCategory,
  getViewedProducts,
  getTotalViewedProducts,
  getRecommendedProducts,
  getTotalRecommendedProducts,
  getBestSellers,
  getTotalBestSellers
} from '../../redux/selectors'
import { Routes } from '../../constants'
import noPicture from '../../images/no_picture.png'
import { fetchViewedProducts } from '../../redux/viewedProducts'
import { fetchRecommendedProducts } from '../../redux/recommendedProducts'
import { fetchBestSellers } from '../../redux/bestSellers'

type Props = {
  addProduct: (productId: number) => void,
  fetchCategories: () => void,
  fetchProductsByFilter: () => void,
  fetchViewedProducts: () => void,
  fetchRecommendedProducts: () => void,
  fetchBestSellers: () => void,
  products: Array<ProductState>,
  categories: Array<CategoryState>,
  push: (route: string) => void,
  totalProducts: number,
  category: ?number,
  viewedProducts: Array<ProductState>,
  totalViewedProducts: number,
  recommendedProducts: Array<ProductState>,
  totalRecommendedProducts: number,
  bestSellers: Array<ProductState>,
  totalBestSellers: number,
}

const PAGE_SIZE = 20
const SHORT_PAGE_SIZE = 4

export class Products extends React.Component<Props> {
  static defaultProps: Props = {
    fetchCategories: () => {},
    categories: [],
    products: [],
    viewedProducts: [],
    recommendedProducts: [],
    bestSellers: [],
  }

  componentDidMount() {
    const {
      category,
      fetchCategories,
      fetchProductsByFilter,
      fetchViewedProducts,
      fetchRecommendedProducts,
      fetchBestSellers
    } = this.props

    fetchCategories()
    fetchProductsByFilter({ first: 0, pageSize: PAGE_SIZE, categoryId: category })
    fetchViewedProducts({ first: 0, pageSize: SHORT_PAGE_SIZE })
    fetchRecommendedProducts({ first: 0, pageSize: SHORT_PAGE_SIZE })
    fetchBestSellers({ first: 0, pageSize: SHORT_PAGE_SIZE })
  }

  showInfo(name: string) {
    this.growl.show({ severity: 'info', summary: 'Success', detail: `${name} was added to your cart` });
  }

  imageTemplate = (picture: PictureState, productId: number) => {
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

  productTemplate = (product: ProductState) => {
    const { addProduct } = this.props
    return (
      <div key={product.id} className="ui-g-12 ui-md-3">
        <Panel header={product.name} style={{ textAlign: 'center' }}>
          {this.imageTemplate(product.picture, product.id)}
          <div>{`${product.price} CZK`}</div>
          <hr className="ui-widget-content" style={{ borderTop: 0 }}/>
          <i className="fa fa-cart-plus" onClick={() => {
            addProduct(product.id)
            this.showInfo(product.name)}} style={{ cursor: 'pointer' }}/>
        </Panel>
      </div>
    )
  }

  onLoadData = (e: any) => {
    const { category, fetchProductsByFilter } = this.props
    fetchProductsByFilter({ first: e.first, pageSize: e.rows, categoryId: category })
  }

  onLoadViewedProducts = (e: any) => {
    const { fetchViewedProducts } = this.props
    fetchViewedProducts({ first: e.first, pageSize: e.rows })
  }

  onLoadRecommendedProducts = (e: any) => {
    const { fetchRecommendedProducts } = this.props
    fetchRecommendedProducts({ first: e.first, pageSize: e.rows })
  }

  onLoadBestSellers = (e: any) => {
    const { fetchBestSellers } = this.props
    fetchBestSellers({ first: e.first, pageSize: e.rows })
  }

  onSelectCategory = (categoryId: number): void => {
    this.props.fetchProductsByFilter({ first: 0, pageSize: PAGE_SIZE, categoryId })
  }

  productsTemplate = () => {
    const { products, totalProducts } = this.props
    return (
      <DataView
        value={products}
        itemTemplate={this.productTemplate}
        paginator
        rows={PAGE_SIZE}
        header="Products"
        layout="grid"
        lazy
        onLazyLoad={this.onLoadData}
        totalRecords={totalProducts}
      />
    )
  }

  viewedProductsTemplate = () => {
    const { viewedProducts, totalViewedProducts } = this.props
    return (
      <DataView
        value={viewedProducts}
        itemTemplate={this.productTemplate}
        paginator
        rows={SHORT_PAGE_SIZE}
        header="Recently viewed"
        layout="grid"
        lazy
        onLazyLoad={this.onLoadViewedProducts}
        totalRecords={totalViewedProducts}
      />
    )
  }

  recommendedProductsTemplate = () => {
    const { recommendedProducts, totalRecommendedProducts } = this.props
    return (
      <DataView
        value={recommendedProducts}
        itemTemplate={this.productTemplate}
        paginator
        rows={SHORT_PAGE_SIZE}
        header="Recommended for you"
        layout="grid"
        lazy
        onLazyLoad={this.onLoadRecommendedProducts}
        totalRecords={totalRecommendedProducts}
      />
    )
  }

  bestSellersTemplate = () => {
    const { bestSellers, totalBestSellers } = this.props
    return (
      <DataView
        value={bestSellers}
        itemTemplate={this.productTemplate}
        paginator
        rows={SHORT_PAGE_SIZE}
        header="Best sellers"
        layout="grid"
        lazy
        onLazyLoad={this.onLoadBestSellers}
        totalRecords={totalBestSellers}
      />
    )
  }

  adaptiveProductTemplate = () => (
      <React.Fragment>
        {this.viewedProductsTemplate()}<br />
        {this.recommendedProductsTemplate()}<br />
        {this.bestSellersTemplate()}
      </React.Fragment>
    )

  props: Props

  render() {
    const { category, categories, viewedProducts, recommendedProducts, bestSellers } = this.props
    const items = convertToMenuState(categories, this.onSelectCategory)
    const Products =
      !category &&
      !!localStorage.getItem('token') &&
      !!(viewedProducts || recommendedProducts || bestSellers)
        ? this.adaptiveProductTemplate()
        : this.productsTemplate()
    return (
      <Layout menuItems={items}>
        <Growl ref={(el) => { this.growl = el }} position="topleft" />
        {Products}
      </Layout>
    )
  }
}

// istanbul ignore next
const mapStateToProps = (state: State) => ({
  totalProducts: getTotalProducts(state),
  products: getProducts(state),
  categories: getCategories(state),
  category: getCategory(state),
  viewedProducts: getViewedProducts(state),
  totalViewedProducts: getTotalViewedProducts(state),
  recommendedProducts: getRecommendedProducts(state),
  totalRecommendedProducts: getTotalRecommendedProducts(state),
  bestSellers: getBestSellers(state),
  totalBestSellers: getTotalBestSellers(state),
})

// istanbul ignore next
const mapDispatchToProps = {
  fetchViewedProducts,
  fetchRecommendedProducts,
  fetchBestSellers,
  fetchProductsByFilter,
  fetchCategories,
  addProduct,
  push,
}

// istanbul ignore next
export default connect(mapStateToProps, mapDispatchToProps)(Products)
