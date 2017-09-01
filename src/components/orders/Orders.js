import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Divider } from 'semantic-ui-react'
import ActiveOrders from './ActiveOrders'
import NewOrder from './NewOrder'
import OrderSummary from './OrderSummary'


export default class Order extends React.Component {
    
    render() {
        return (
            <div>
                <Divider hidden />
                <Switch>
                    <Route exact path="/orders/new/summary" render={({location}) => <OrderSummary {...location.state} />}/>  
                    <Route path="/orders/new" component={NewOrder} />
                    <Route path="/orders" component={ActiveOrders} />
                </Switch>
            </div>
        )
    }
}