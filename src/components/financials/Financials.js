import React from 'react'
import { Container, Segment, Header, List } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import { graphql, gql } from 'react-apollo'
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