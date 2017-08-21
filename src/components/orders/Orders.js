import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Container, Divider, Button } from 'semantic-ui-react'
import ActiveOrders from './ActiveOrders'
import NewOrder from './NewOrder'


export default class Order extends React.Component {
    
    render() {
        return (
            <div>
                <Divider hidden />
                <Switch>
                    <Route path="/orders/new" component={NewOrder} />
                    <Route path="/orders" component={ActiveOrders} />
                </Switch>
            </div>
        )
    }
}