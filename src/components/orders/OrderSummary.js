import React from 'react';
import { Header } from 'semantic-ui-react';
import { List } from 'immutable'

export default class OrderSummary extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Header content={this.props.cartTotal} />
        )
    }
}