import React from 'react'
import { Switch, Route} from 'react-router-dom'
import TestComponent from './TestComponent'

const Inventory = () => {
    <div>
        <h1>Inventory</h1>
    </div>
}

const Orders = () => {
     <div>
        <h1>Inventory</h1>
    </div>
}

export default class Body extends React.Component {
    render(){
        return (
            <div className="ui center aligned container">
                <Switch>
                    <Route exact path="/" component={TestComponent}/>
                    <Route path="/financials" component={Financials} />
                    <Route path="/orders" component={Orders} />
                </Switch>
            </div>
        )
    }
}