import React from 'react';
import { Header, Button, Segment, Table } from 'semantic-ui-react';
// import { List } from 'immutable'
import { Link } from 'react-router-dom'
// import Moment from 'moment'
import { graphql, compose, gql } from 'react-apollo'

const CREATE_ORDER_NEW_USER_MUTATION = gql`
    mutation CreateOrderMutation(
        $isActive: Boolean,
        $total: Float,
        $user: OrderuserUser,
        $productsIds: [ID!],
        $quantities: [OrderquantitiesQuantity!]
    ) {
        createOrder(
            isActive: $isActive,
            total: $total,
            user: $user,
            productsIds: $productsIds,
            quantities: $quantities,
        ) {
            id
        }
    }
`
const CREATE_ORDER_MUTATION = gql`
    mutation CreateOrderMutation(
        $isActive: Boolean,
        $total: Float,
        $userId: ID,
        $productsIds: [ID!],
        $quantities: [OrderquantitiesQuantity!]
    ) {
        createOrder(
            isActive: $isActive,
            total: $total,
            userId: $userId,
            productsIds: $productsIds,
            quantities: $quantities,
        ) {
            id
        }
    }
`
const FIND_USERID_QUERY = gql`
    query FindUserIdQuery (
        $cell: Float
    ) {
        allUsers(filter: 
            {
                cell: $cell
            }
        ){
            id
        }
    }
`
class OrderSummary extends React.Component {
    
    render() {
        return (
            <div>
                <Segment.Group>
                    <Header as='h2' attached='top'>
                        <Header.Content>
                            <em>Confirm Order</em>
                        </Header.Content>
                    </Header>
                    <Segment>
                        <Header as='h3' attached='top'><em>Cart Summary</em></Header>
                        <Table basic
                               size='small'
                               singleLine
                               compact
                               unstackable
                               columns={2}
                               attached='bottom'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign='right'>Items</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='left' colSpan='three'>Quantity</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                { this.props.cartItems.map( (item, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell textAlign='right'>{item.name}</Table.Cell>
                                        <Table.Cell textAlign='left'>{item.units}{' g'}</Table.Cell>
                                    </Table.Row>
                                ))}
                                <Table.Row>
                                    <Table.Cell textAlign='right'><Header as='h5'>Quantity:</Header></Table.Cell>
                                    <Table.Cell textAlign='left'>
                                        <Header as='h3'>
                                            {this.props.cartItems.reduce((sum, item) => item.units + sum, 0)}{' g'}
                                        </Header>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell textAlign='right'><Header as='h5'>Total:</Header></Table.Cell>
                                    <Table.Cell textAlign='left'>
                                        <Header as='h3'>{this.props.cartTotal}{' $'}</Header>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Segment>
                    <Segment basic textAlign='center'>
                        <Header as='h3' attached='top'><em>Contact Info</em></Header>
                        <Table basic
                               unstackable
                               attached='bottom'>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell textAlign='right'><em>Name:</em></Table.Cell>
                                    <Table.Cell><Header as='h4'>{this.props.name}</Header></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell textAlign='right'><em>Cell:</em></Table.Cell>
                                    <Table.Cell><Header as='h4'>{this.props.cell}</Header></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Segment>
                    <Button.Group attached='bottom' widths={2}>
                        <Link to='orders/new' replace className='ui button'>edit</Link>
                        <Button content='submit' 
                                onClick={() => this._placeOrder()} 
                                loading={this.isCreateMutationLoading()} />
                    </Button.Group>
                </Segment.Group>
            </div>
        )
    }

    isCreateMutationLoading = () => {
        if (this.props.createOrderMutation && this.props.createOrderMutation.loading){
            return true
        } else {
            return false
        }
    }

    _placeOrder = async () => {
        const { name, cell, cartItems, cartTotal} = this.props
        const quantities = cartItems.map( item => {
            let { id, units} = item
            console.log(id)
            return {
                units,
                productId: id
            }
        })
        var userId
        try { 
            userId = await this.props.findUserIdQuery.refetch().then(res => res.data.allUsers[0].id)
        } catch(e) {
            console.log('error',e)
        }
        console.log('userID', userId)
        console.log('type of userId', typeof(userId))
        const productsIds = cartItems.map( item => item.id)
        const variables = ( userId === undefined) ? {
                            variables: {
                                isActive: true,
                                total: cartTotal,
                                user: {
                                    name,
                                    cell,
                                },
                                productsIds,
                                quantities,
                            }
                            } : {
                                variables: {
                                    isActive: true,
                                    total: cartTotal,
                                    userId, 
                                    productsIds,
                                    quantities,
                                }
                            }
        console.log('variables', variables)
        if (userId === undefined) { 
            await this.props.createOrderNewUserMutation(variables).then( res => this.props.history.replace('/orders', {open: true}) )
        } else {
            await this.props.createOrderMutation(variables).then( res => this.props.history.replace('/orders', {open: true}) )
        }
    }

}
export default compose(
    graphql(CREATE_ORDER_NEW_USER_MUTATION, {name: 'createOrderNewUserMutation'}),
    graphql(CREATE_ORDER_MUTATION, {name: 'createOrderMutation'}),
    graphql(FIND_USERID_QUERY, {name: 'findUserIdQuery'})
)(OrderSummary)