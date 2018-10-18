import * as React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'

import { Menu } from '../Menu'
import { Bar } from '../Bar'

type Props = {
  children: React.Node,
  menuItems?: any,
}

export const Layout = ({ children, menuItems }: Props) => {
  const Body = menuItems ? (
    <React.Fragment>
      <div className="ui-g-12 ui-md-2"><Menu items={menuItems} /></div>
      <div className="ui-g-12 ui-md-10">
        <div className="ui-g-12 ui-g-nopad">
          {children}
        </div>
      </div>
    </React.Fragment>
  ) : (
    <div className="ui-g-12 ui-md-12">
      <div className="ui-g-12 ui-g-nopad">
        {children}
      </div>
    </div>
  )
  return (
    <div className="ui-g">
      <div className="ui-g-12"><Bar /></div>
      {Body}
    </div>
  )
}

export default Layout
