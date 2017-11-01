import React from 'react'
import { graphql, gql, compose } from 'react-apollo'
import DesktopOrderHistory from './DesktopOrderHistory'
import { Responsive } from 'semantic-ui-react'
const ACTIVE_ORDERS_QUERY = gql`
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
const ACTIVE_ORDERS_QUERY_REFETCH = gql`
    query ActiveOrdersQuery($id: String!) {
        allOrders(
            first: 5,
            after: $id,
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
export class OrderHistory extends React.Component {

    render() {
        return (
            <div>
                <Responsive minWidth={650}><DesktopOrderHistory {...this.props} /></Responsive>
                <Responsive maxWidth={649}><div>TEST</div></Responsive>
            </div>
        )
    }
}

export default compose(
    graphql(ACTIVE_ORDERS_QUERY, { name: 'activeOrdersQuery' }),
    graphql(DELETE_ORDER_MUTATION, {name: 'deleteOrderMutation'})
)(OrderHistory)