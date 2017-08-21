import React from 'react'
import { NavLink } from 'react-router-dom'
import { Header, Menu } from 'semantic-ui-react'

export default class AdminNav extends React.Component {
    render() {
        return (
            <Menu borderless size='large' widths={3} >
                <NavLink className="item" exact to="/"><Header size="tiny">Inventory</Header></NavLink>
                <NavLink className="item" exact to="/orders"><Header size="tiny">Orders</Header></NavLink>
                <NavLink className="item" exact to="/financials"><Header size="tiny">Financials</Header></NavLink>
            </Menu>
        )
    }
}