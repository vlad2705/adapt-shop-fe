import * as React from 'react'
import { PanelMenu } from 'primereact/components/panelmenu/PanelMenu'

type Props = {
  items?: any,
}

export const Menu = ({ items }: Props) => (
  <div className="content-section implementation">
    <PanelMenu model={items || []} />
  </div>
)

export default Menu
