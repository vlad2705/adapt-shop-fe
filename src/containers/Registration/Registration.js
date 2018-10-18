// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'

import { changeRegistrationData, fetchRegistrationData, signUp } from '../../redux/registration'
import type { RegistrationState } from '../../types'
import { RegistrationForm } from './RegistrationForm'
import { Layout } from '../../components/Layout'

type Props = {
  changeRegistrationData: (data: RegistrationState) => void,
  fetchRegistrationData: () => void,
  signUp: (data: RegistrationState) => void,
}

export class Registration extends React.Component<Props> {
  componentDidMount() {
    localStorage.getItem('token') && this.props.fetchRegistrationData()
  }

  onSubmitRegistration = (data: RegistrationState) => {
    const { changeRegistrationData, signUp } = this.props
    localStorage.getItem('token') ? changeRegistrationData(data) : signUp(data)
  }

  props: Props

  render() {
    return (
      <Layout>
        <RegistrationForm onSubmit={this.onSubmitRegistration} />
      </Layout>
    )
  }
}

const mapDispatchToProps = {
  changeRegistrationData,
  fetchRegistrationData,
  signUp,
}

export default connect(null, mapDispatchToProps)(Registration)
