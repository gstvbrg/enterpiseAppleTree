import React from 'react'
import { Switch, Route} from 'react-router-dom'
import Inventory from '../inventory/Inventory'
import Orders from '../orders/Orders'
import { Container } from 'semantic-ui-react'

const Financials = () => (
     <div>
        <h1>Financials</h1>
    </div>
)

export default class Body extends React.Component {
    render(){
        return (
            <Container textAlign="center">
                <Switch>
                    <Route exact path="/" component={Inventory}/>
                    <Route path="/orders" component={Orders} />
                    <Route path="/financials" component={Financials} />
                </Switch>
            </Container>
        )
    }
}