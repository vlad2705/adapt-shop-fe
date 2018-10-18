// @flow
import * as React from 'react'
import { Field, FormSection } from 'redux-form'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'

export const UserForm = () => (
  <React.Fragment>
    <div className="ui-g-12 ui-md-2">
      <label htmlFor="firstName">First name:</label>
    </div>
    <div className="ui-g-12 ui-md-4">
      <Field name="firstName" component="input" type="text" />
    </div>
    <div className="ui-g-12 ui-md-2">
      <label htmlFor="lastName">Last name:</label>
    </div>
    <div className="ui-g-12 ui-md-4">
      <Field name="lastName" component="input" type="text" />
    </div>
    <div className="ui-g-12 ui-md-2">
      <label htmlFor="phone">Phone:</label>
    </div>
    <div className="ui-g-12 ui-md-4">
      <Field name="phone" component="input" type="text" />
    </div>
    <FormSection name="address">
      <div className="ui-g-12 ui-md-2">
        <label htmlFor="address">Address:</label>
      </div>
      <div className="ui-g-12 ui-md-4">
        <Field name="address" component="input" type="text" />
      </div>
      <div className="ui-g-12 ui-md-2">
        <label htmlFor="postalCode">Postal Code:</label>
      </div>
      <div className="ui-g-12 ui-md-4">
        <Field name="postalCode" component="input" type="text" />
      </div>
      <div className="ui-g-12 ui-md-2">
        <label htmlFor="city">City:</label>
      </div>
      <div className="ui-g-12 ui-md-4">
        <Field name="city" component="input" type="text" />
      </div>
      <div className="ui-g-12 ui-md-2">
        <label htmlFor="country">Country:</label>
      </div>
      <div className="ui-g-12 ui-md-4">
        <Field name="country" component="input" type="text" />
      </div>
    </FormSection>
    <FormSection name="client">
      <div className="ui-g-12 ui-md-2">
        <label htmlFor="email">Email:</label>
      </div>
      <div className="ui-g-12 ui-md-4">
        <Field name="email" component="input" type="email" />
      </div>
    </FormSection>
  </React.Fragment>
)

export default UserForm