import React from 'react'
import { Segment, Header, Table } from 'semantic-ui-react'


const CartTableRow = (props) => {
    console.log('amount ', parseFloat(props.item.amount))
    return (
        <Table.Row>
            <Table.Cell >{props.item.strain}</Table.Cell>
            <Table.Cell >{props.item.amount}</Table.Cell>
            <Table.Cell >${(eval(props.item.amount) * 28)*12.5}</Table.Cell>
        </Table.Row>
    )
}

const CartTable = (props) => {
    return(
        <Table celled unstackable columns={3}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Strain</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Cost</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.cartItems.map( item => <CartTableRow key={item.strain} item={item} />)}
                <Table.Row>
                    <Table.Cell colSpan={2} textAlign="right">Total:</Table.Cell>
                    <Table.Cell>{"$ " + props.cartItems.reduce((total, item) => total + ((eval(item.amount) * 28) * 10), 0) }</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}

const Cart = (props) => {
    return (
        <div>
            <hr/>
            <Header size='medium'>Cart</Header>
            <CartTable cartItems={props.cartItems} />
        </div>
    )
}

export default Cart