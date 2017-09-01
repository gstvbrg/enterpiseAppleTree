import React from 'react'
import { Map, List } from 'immutable'
import { Segment, Input, Header, Divider, Form, Button } from 'semantic-ui-react'
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

    phoneInputHandler = (evt) => {
        const pattern = new RegExp('\\D','g')
        this.setState({
            [evt.target.name]: (evt.target.value).split(pattern).join('')
        })
    }

    componentDidMount() {
        const now = Moment().format("dddd, MMMM Do YYYY");
        this.setState({ now });
    }

    addCartItemToOrder = (items) => {
        this.setState( (prevState) => ({
          cartItems: List([...items]).filter( item => item.units > 0)  
        }))
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
                                name='name' required onChange={this.textInputHandler} />
                        </Form.Field>
                        <Form.Field>
                            <Input fluid label={{ basic: true, content: 'Cell #'}} labelPosition='left' size='small' placeholder='(xxx)-xxx-xxxx' 
                                name='cell' onChange={this.phoneInputHandler} maxLength="14" />
                        </Form.Field>
                    </Form>
                    <Divider hidden />
                    <NewOrderMenu {...this.props} addCartItemToOrder={this.addCartItemToOrder} />
                </Segment>
            </Segment.Group>
        )
    }
}

export default graphql(CurrentInventoryQuery, {name: 'currentInventory'})(NewOrder)