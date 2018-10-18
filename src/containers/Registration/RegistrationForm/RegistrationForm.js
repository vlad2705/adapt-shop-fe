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

export const RegistrationForm = ({ handleSubmit, push }: Props) => (
  <form onSubmit={handleSubmit}>
    <div className="ui-g">
      <div className="ui-g-12 ui-md-2 ui-lg-3"/>
      <div className="ui-g-12 ui-md-8 ui-lg-6">
        <Panel header="Sign up" style={{ marginBottom: '1em' }}>
          <div className="ui-g">
            <div className="ui-g-12 ui-md-2">
              <label htmlFor="firstName">First name:</label>
            </div>
            <div className="ui-g-12 ui-md-4">
              <Field name="firstName" component={InputField} type="text"/>
            </div>
            <div className="ui-g-12 ui-md-2">
              <label htmlFor="lastName">Last name:</label>
            </div>
            <div className="ui-g-12 ui-md-4">
              <Field name="lastName" component={InputField} type="text"/>
            </div>
            <div className="ui-g-12 ui-md-2">
              <label htmlFor="phone">Phone:</label>
            </div>
            <div className="ui-g-12 ui-md-4">
              <Field name="phone" component={InputField} type="text"/>
            </div>
            <div className="ui-g-12 ui-md-2">
              <label htmlFor="address.address">Address:</label>
            </div>
            <div className="ui-g-12 ui-md-4">
              <Field name="address.address" component={InputField} type="text"/>
            </div>
            <div className="ui-g-12 ui-md-2">
              <label htmlFor="address.postalCode">Postal Code:</label>
            </div>
            <div className="ui-g-12 ui-md-4">
              <Field name="address.postalCode" component={InputField} type="text"/>
            </div>
            <div className="ui-g-12 ui-md-2">
              <label htmlFor="address.city">City:</label>
            </div>
            <div className="ui-g-12 ui-md-4">
              <Field name="address.city" component={InputField} type="text"/>
            </div>
            <div className="ui-g-12 ui-md-2">
              <label htmlFor="address.country">Country:</label>
            </div>
            <div className="ui-g-12 ui-md-4">
              <Field name="address.country" component={InputField} type="text"/>
            </div>
            <div className="ui-g-12 ui-md-2">
              <label htmlFor="client.email">Email:</label>
            </div>
            <div className="ui-g-12 ui-md-4">
              <Field name="client.email" component={InputField} keyfilter="email"/>
            </div>
            <div className="ui-g-12 ui-md-2">
              <label htmlFor="client.password">Password:</label>
            </div>
            <div className="ui-g-12 ui-md-4">
              <Field name="client.password" component={InputField} type="password"/>
            </div>
          </div>
        </Panel>
        <div className="ui-g-12 ui-md-4">
          <Button type="button" label="Back to shopping" icon="fa-chevron-left" onClick={() => push(Routes.PRODUCTS)}
                  style={{ width: '100%' }}/>
        </div>
        <div className="ui-g-12 ui-md-4"/>
        <div className="ui-g-12 ui-md-4" style={{ textAlign: 'right' }}>
          <Button type="submit" label="Save" icon="fa-save" style={{ width: '100%' }}/>
        </div>
      </div>
      <div className="ui-lg-12 ui-md-2 ui-lg-3"/>
    </div>
  </form>
)

const registrationForm = reduxForm({
  form: 'registration',
})(RegistrationForm)

const mapDispatchToProps = {
  push,
}

export default connect(null, mapDispatchToProps)(registrationForm)
