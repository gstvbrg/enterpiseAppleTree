import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import { List } from 'immutable'

export default class OrderSummary extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <ul>
                    <li>{this.props.cartTotal}</li>
                    <li>{this.props.name}</li>
                    <li>{this.props.cell}</li>
                </ul>
                <Button content="Submit" onClick={() => console.log(this.props)} />
            </div>
        )
    }
}