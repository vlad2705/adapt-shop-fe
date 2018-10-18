// @flow
import * as React from 'react'
import { push } from 'react-router-redux'
import { Button } from 'primereact/components/button/Button'

import { Layout } from '../../../components/Layout'
import { Routes } from '../../../constants'
import { connect } from 'react-redux'

type Props = {
  push: (route: string) => void,
}

const OrderSuccess = ({ push }: Props) => (
  <Layout>
    <div className="ui-g">
      <div className="ui-g-12" style={{ textAlign: 'center', marginTop: '10%' }}>
        <i className="fa fa-check fa-5x" />
        <h1>
          <strong>Thank you for your order!</strong>
        </h1>
      </div>
      <div className="ui-g-12" style={{ textAlign: 'center' }}>
        <Button
          label="Back to shopping"
          icon="fa-chevron-left"
          onClick={() => push(Routes.PRODUCTS)}
        />
      </div>
    </div>
  </Layout>
)

const mapDispatchToProps = {
  push,
}

export default connect(null, mapDispatchToProps)(OrderSuccess)
