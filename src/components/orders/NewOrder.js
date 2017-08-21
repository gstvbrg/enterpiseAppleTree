import React from 'react'
import { Segment, Input, Button, Header, Item, Icon, Divider, Form } from 'semantic-ui-react'
import Cart from './Cart'
import OrderMenu from './OrderMenu'
import Moment from 'moment'
import { graphql, gql } from 'react-apollo'
import { CurrentInventoryQuery } from '../inventory/CurrentInventoryTable'

class NewOrder extends React.Component {
    constructor() {
        super()
        this.state = {            
            name: '',
            cell: '',
            cartItems: []
        }
    }

    textInputHandler = (evt) => (
        this.setState({
            [evt.target.name]: evt.target.value
        })
    )


    componentDidMount() {
        const now = Moment().format("dddd, MMMM Do YYYY");
        this.setState({ now });
    }

    render () {

        return (
            <Segment.Group>
                <Segment>
                    <Header textAlign='left' as='h3'>
                        New Order
                        <Header.Subheader>{this.state.now}</Header.Subheader>
                    </Header>
                </Segment>
                <Segment>
                    <Form>
                        <Form.Field required>
                            <Input fluid label={{ basic: true, content: 'Name' }} labelPosition='left' size='small' placeholder='First Name' 
                                name='name' onChange={this.textInputHandler} />
                        </Form.Field>
                        <Form.Field>
                            <Input fluid label={{ basic: true, content: 'Cell #'}} labelPosition='left' size='small' placeholder='(xxx)-xxx-xxxx' 
                                name='cell' onChange={this.textInputHandler} />
                        </Form.Field>
                    </Form>
                    <Divider hidden />
                    <OrderMenu {...this.props} />
                </Segment>
            </Segment.Group>
        )
    }
}

export default graphql(CurrentInventoryQuery, {name: 'currentInventory'})(NewOrder)