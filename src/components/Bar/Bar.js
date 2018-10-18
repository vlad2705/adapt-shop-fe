// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'
import { Toolbar } from 'primereact/components/toolbar/Toolbar'
import { Routes } from '../../constants'
import { logout } from '../../redux/login'

type Props = {
  logout: () => void,
  push: (route: string) => void,
}

export const Bar = ({ logout, push }: Props) => {
  const onRedirect = (route: string) => push(route)
  const token = localStorage.getItem('token')
  const cart = token && (
    <div className="ui-g-4">
      <i className="fa fa-shopping-cart" onClick={() => onRedirect(Routes.CART)} style={{ cursor: 'pointer' }} />
    </div>
  )
  return (
    <Toolbar>
      <div className="ui-g ui-toolbar-group-right">
        {cart}
        <div className="ui-g-4">
          <i className={`fa fa-${token ? 'cog' : 'user-plus'}`}
             onClick={() => onRedirect(Routes.REGISTRATION)}
             style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="ui-g-4">
          <i className={`fa fa-sign-${token ? 'out' : 'in'}`}
             onClick={() => token ? logout() : onRedirect(Routes.LOGIN)}
             style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </Toolbar>
  )
}

const mapDispatchToProps = {
  push,
  logout,
}

export default connect(null, mapDispatchToProps)(Bar)
