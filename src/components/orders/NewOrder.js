import React from 'react'
import { List } from 'immutable'
import { Segment, Input, Header, Divider, Form } from 'semantic-ui-react'
import NewOrderMenu from './NewOrderMenu'
import Moment from 'moment'
import { graphql } from 'react-apollo'
import { CurrentInventoryQuery } from '../inventory/CurrentInventoryTable'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const validateName = (name) => {
    if (/^\w{2,15}$/g.test(name)) {
        return true
    } else {
        return false
    }
}

export const validateCell = (cell) => {
    if (/\(?(\d{3})\)?[\s-]?\d{3}[\s-]?\d{4}/g.test(cell)) {
        return true
    } else {
        return false
    }
}

class NewOrder extends React.Component {
    constructor() {
        super()
        this.state = {          
            name: '',
            cell: '',
            date: Moment(),
            cartItems: new List()
        }
    }

    textInputHandler = (evt) => (
        this.setState({
            [evt.target.name]: evt.target.value
        })
    )

    phoneInputHandler = (evt) => {
        this.setState({
            [evt.target.name]: (evt.target.value)
        })
    }

    addCartItemToOrder = (items) => {
        this.setState( () => ({
            cartItems: List([...items]).filter( item => item.units > 0)  
        }))
    }
    
    dateSelectionHandler = (date) => {
        this.setState({ date })
    }

    componentDidMount() {
        const now = Moment().format("dddd, MMMM Do YYYY");
        this.setState({ now });
    }

    render () {
        const validCell = validateCell(this.state.cell)
        return (
            <Segment.Group>
                <Segment>
                    <Header textAlign='left' as='h3'>
                        New Order
                        <Header.Subheader>{this.state.now}</Header.Subheader>
                    </Header>
                </Segment>
                <Segment textAlign='left'>
                    <Form>
                        <Header as='h5' floated='left' content='Name'/>
                        <Form.Field error={!validateName(this.state.name)}>
                            <Input fluid 
                            size='small'
                            maxLength="14"
                            placeholder='First Name' 
                            name='name' 
                            onChange={this.textInputHandler}
                            icon={validateName(this.state.name) ? {name: 'checkmark', color: 'green', size: 'large'} : {name: 'remove', color: 'red', size: 'large'}}
                            />
                        </Form.Field>
                        <Header as='h5' floated='left' content='Cell #'/>
                        <Form.Field error={!validCell}>
                            <Input fluid 
                            size='small' 
                            maxLength="14"
                            placeholder='(xxx)-xxx-xxxx' 
                            name='cell' 
                            onChange={this.phoneInputHandler} 
                            icon={validateCell(this.state.cell) ? {name: 'checkmark', color: 'green', size: 'large'} : {name: 'remove', color: 'red', size: 'large'}}
                            />
                        </Form.Field>
                        <Header as='h5' textAlign='left' content='Date'/>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.dateSelectionHandler}
                            onSelect={this.dateSelectionHandler}
                            showTimeSelect
                            timeIntervals={15}
                            popperPlacement="bottom-start"
                            dateFormat="MM/DD/YY,   h:mm A"
                        />
                    </Form>
                    <Divider hidden />
                    <NewOrderMenu name={this.state.name} cell={this.state.cell} date={this.state.date} addCartItemToOrder={this.addCartItemToOrder} {...this.props} />
                </Segment>
            </Segment.Group>
        )
    }
}

export default graphql(CurrentInventoryQuery, {name: 'currentInventory'})(NewOrder)