import React from 'react';
import { Header, Button, Segment, Table } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom'
import { graphql, compose, gql } from 'react-apollo'
import { ACTIVE_ORDERS_QUERY } from './OrderHistory'

const CREATE_ORDER_NEW_USER_MUTATION = gql`
    mutation CreateOrderNewUserMutation(
        $isActive: Boolean,
        $date: String!,
        $total: Float,
        $user: OrderuserUser,
        $productsIds: [ID!],
        $quantities: [OrderquantitiesQuantity!]
    ) {
        createOrder(
            isActive: $isActive,
            date: $date,
            total: $total,
            userId: $user,
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
        $date: String!,
        $total: Float,
        $userId: ID,
        $productsIds: [ID!],
        $quantities: [OrderquantitiesQuantity!]
    ) {
        createOrder(
            isActive: $isActive,
            date: $date,
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

    state = {
        redirect: false
    }
    
    render() {
        if (this.state.redirect === true) {
            this.props.activeOrdersQuery.refetch()
            return (
                <Redirect to='/orders'/>
            )
        } 
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
                                onClick={() => this._placeOrder()} />
                    </Button.Group>
                </Segment.Group>
            </div>
        )
    }

    itemQuantitiesFrom = (cartItems) => (
        cartItems.map( item => {
            let { id, units } = item
            return {
                units,
                productId: id,
            }
        })
    )

    fetchUserId = async () => (
        this.props.findUserIdQuery.refetch().then(res => {
            try { return res.data.allUsers[0].id } catch(e) { return null } 
        })
    )

    productIdsFrom = (cartItems) => (
        cartItems.map( item => item.id )
    )

    setOrderProperities = (orderUserId, orderQuantities, orderProductsIds) => {
        const { name, cell, cartTotal, date} = this.props
        return orderUserId === null ? 
        ({
            variables: {
                isActive: true,
                date,
                total: cartTotal,
                user: {
                    name,
                    cell,
                },
                productsIds: orderProductsIds,
                quantities: orderQuantities,
            }
        }) : 
        ({
            variables: {
                isActive: true,
                date,
                total: cartTotal,
                userId: orderUserId,
                productsIds: orderProductsIds,
                quantities: orderQuantities,
            }
        })
    }

    createNewOrderWith = async (orderPropertities) => {
        if (orderPropertities.variables.userId) {
            this.props.createOrderMutation(orderPropertities).then( res => this.setState({ redirect: true }) )
        } else {
            this.props.createOrderNewUserMutation(orderPropertities).then( res => this.setState({ redirect: true }) )
        }
    }

    _placeOrder = async () => {
        
        const { cartItems } = this.props

        const orderQuantities = this.itemQuantitiesFrom(cartItems)
        const orderUserId = await this.fetchUserId()
        const orderProductsIds = this.productIdsFrom(cartItems)

        const orderPropertiesForDB = this.setOrderProperities(orderUserId, orderQuantities, orderProductsIds)
        
        try {
            await this.createNewOrderWith(orderPropertiesForDB);
        } catch(e) {
            console.log(e)
        }
    }
}
export default compose(
    graphql(CREATE_ORDER_NEW_USER_MUTATION, {name: 'createOrderNewUserMutation'}),
    graphql(CREATE_ORDER_MUTATION, {name: 'createOrderMutation'}),
    graphql(FIND_USERID_QUERY, {name: 'findUserIdQuery'}),
    graphql(ACTIVE_ORDERS_QUERY, {name: 'activeOrdersQuery'})
)(OrderSummary)