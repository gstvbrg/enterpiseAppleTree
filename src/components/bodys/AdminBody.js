import React from 'react'
import { Switch, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import AdminNav from '../navbars/AdminNav'
import Inventory from '../inventory/Inventory'
import Orders from '../orders/Orders'
import Financials from '../financials/Financials'

export default class Body extends React.Component {
    render(){
        return (
            <div>
                <AdminNav/>
                <Container textAlign="center">
                    <Switch>
                        <Route exact path="/" component={Inventory}/>
                        <Route path="/orders" component={Orders} />
                        <Route path="/financials" component={Financials} />
                    </Switch>
                </Container>
            </div>
        )
    }
}