// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'

import { addReview, fetchReview } from '../../redux/review'
import type { ReviewState } from '../../types'
import { ReviewForm } from './ReviewForm'
import { Layout } from '../../components/Layout'
import { Routes } from '../../constants'

type Props = {
  addReview: (productId: number, data: ReviewState) => void,
  fetchReview: (productId: number) => void,
  match: {
    params: {
      productId?: string,
    },
  },
  push: (route: string) => void,
}

export class Review extends React.Component<Props> {
  componentDidMount() {
    const { fetchReview, match: { params: { productId }}, push } = this.props
    if (!localStorage.getItem('token')) {
      push(Routes.LOGIN)
    } else if (!productId) {
      push(Routes.PRODUCTS)
    } else {
      fetchReview(+productId)
    }
  }

  onSubmitReview = (data: ReviewState) => {
    const { addReview, match: { params: { productId }} } = this.props
    addReview({ productId, data })
  }

  props: Props

  render() {
    const { match: { params: { productId }} } = this.props
    return (
      <Layout>
        <ReviewForm productId={+productId} onSubmit={this.onSubmitReview} />
      </Layout>
    )
  }
}

const mapDispatchToProps = {
  addReview,
  fetchReview,
  push,
}

export default connect(null, mapDispatchToProps)(Review)
