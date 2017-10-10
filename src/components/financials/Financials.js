import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FinancialsDisplay from './FinancialsDisplay'

export default class Financials extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path='/financials' component={FinancialsDisplay}/>
            </Switch>
        )
    }
}