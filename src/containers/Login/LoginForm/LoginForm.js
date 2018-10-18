// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, FormProps, reduxForm } from 'redux-form'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'
import { Button } from 'primereact/components/button/Button'
import { Panel } from 'primereact/components/panel/Panel'

import { InputField } from '../../../components/InputField'
import { Routes } from '../../../constants'

type Props = {
  push: (route: string) => void,
} & FormProps

export const LoginForm = ({ handleSubmit, push }: Props) => (
  <form onSubmit={handleSubmit}>
    <div className="ui-g">
      <div className="ui-g-12 ui-md-3 ui-lg-4"/>
      <div className="ui-g-12 ui-md-6 ui-lg-4">
        <Panel header="Sign in" style={{ marginBottom: '1em' }}>
          <div className="ui-g">
            <div className="ui-g-12 ui-md-4">
              <label htmlFor="email">Email:</label>
            </div>
            <div className="ui-g-12 ui-md-8 ui-fluid">
              <Field name="email" component={InputField} type="text" keyfilter="email"/>
            </div>
            <div className="ui-g-12 ui-md-4">
              <label htmlFor="password">Password:</label>
            </div>
            <div className="ui-g-12 ui-md-8 ui-fluid">
              <Field name="password" component={InputField} type="password"/>
            </div>
          </div>
        </Panel>
        <div className="ui-g-12 ui-md-4">
          <Button type="button" label="Back to shopping" icon="fa-chevron-left" onClick={() => push(Routes.PRODUCTS)}
                  style={{ width: '100%' }}/>
        </div>
        <div className="ui-g-12 ui-md-4"/>
        <div className="ui-g-12 ui-md-4" style={{ textAlign: 'right' }}>
          <Button type="submit" label="Sign in" icon="fa-sign-in" style={{ width: '100%' }} />
        </div>
      </div>
      <div className="ui-lg-12 ui-md-3 ui-lg-4"/>
    </div>
  </form>
)

const loginForm = reduxForm({
  form: 'login',
})(LoginForm)

const mapDispatchToProps = {
  push,
}

export default connect(null, mapDispatchToProps)(loginForm)
