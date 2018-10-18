// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'

import { login } from '../../redux/login'
import type { LoginState } from '../../types'
import { LoginForm } from './LoginForm'
import { Layout } from '../../components/Layout'

type Props = {
  login: (data: LoginState) => void,
}

export const Login = ({ login }: Props) => (
  <Layout>
    <LoginForm onSubmit={login} />
  </Layout>
)

const mapDispatchToProps = {
  login,
}

export default connect(null, mapDispatchToProps)(Login)
