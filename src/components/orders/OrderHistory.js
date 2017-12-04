import React from 'react'
import { graphql, gql, compose } from 'react-apollo'
import DesktopOrderHistory from './DesktopOrderHistory'
import MobileOrderHistory from './MobileOrderHistory'
import { Responsive, Container, Loader, Divider } from 'semantic-ui-react'

export const ACTIVE_ORDERS_QUERY = gql`
    query ActiveOrdersQuery {
        allOrders(
            first: 5,
            filter: {
                isActive: true 
            }
            orderBy: createdAt_DESC
        ){
            id
            user {
                id
                cell
                name
            }
            total
            date
            createdAt
            quantities {
                units
                product {
                    type
                    flower {
                        name
                    }
                    cartridge {
                        name
                    }
                }
            }
        }
    }
`
const DELETE_ORDER_MUTATION = gql`
    mutation DeleteOrderById($id: ID!) {
        deleteOrder(id: $id) {
            id
        }
    }
`

export class OrderHistory extends React.Component {
    render() {

        if (this.props.activeOrdersQuery && this.props.activeOrdersQuery.loading) {
            return (
                <Container style={{width: '50%', height: '50%', margin: 'auto'}}>
                        <Divider hidden />
                        <Divider hidden />
                        <Loader active inline='centered' size='large' /> Loading
                        <Divider hidden />
                        <Divider hidden />
                </Container>
            )
        }

        return (
            <Container>
                <Responsive minWidth={750}><DesktopOrderHistory {...this.props} /></Responsive>
                <Responsive maxWidth={749}><MobileOrderHistory {...this.props} /></Responsive>
            </Container>
        )
    }
}

export default compose(
    graphql(ACTIVE_ORDERS_QUERY, { name: 'activeOrdersQuery' }),
    graphql(DELETE_ORDER_MUTATION, {name: 'deleteOrderMutation'})
)(OrderHistory)