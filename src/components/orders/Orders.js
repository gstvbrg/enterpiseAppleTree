import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Divider } from 'semantic-ui-react'
import ActiveOrders from './ActiveOrders'
import NewOrder from './NewOrder'
import OrderSummary from './OrderSummary'
import DataMigrations from '../../utils/DataMigrations'


export default class Order extends React.Component {
    
    render() {
        return (
            <div>
                <Divider hidden />
                <Switch>
                    <Route exact path="/orders/new/summary" render={({location, history}) => <OrderSummary {...location.state} history={history} />}/>  
                    <Route exact path="/orders/new" component={NewOrder} />
                    <Route exact path="/orders" render={ (props) => <ActiveOrders {...props}/>} />
                    <Route exact path="/orders/migrations" component={DataMigrations} />
                </Switch>
            </div>
        )
    }
}