import React from 'react'
import { Map, List } from 'immutable'
import { Segment, Input, Header, Divider, Form } from 'semantic-ui-react'
import NewOrderMenu from './NewOrderMenu'
import Moment from 'moment'
import { graphql, gql } from 'react-apollo'
import { CurrentInventoryQuery } from '../inventory/CurrentInventoryTable'

class NewOrder extends React.Component {
    constructor() {
        super()
        this.state = {          
            name: '',
            cell: '',
            cartItems: new List()
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
                    <NewOrderMenu {...this.props} />
                </Segment>
            </Segment.Group>
        )
    }
}

export default graphql(CurrentInventoryQuery, {name: 'currentInventory'})(NewOrder)