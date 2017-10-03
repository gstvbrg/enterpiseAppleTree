import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Container, Segment, Header, Table, Label, Divider, List, Button, Icon, Confirm } from 'semantic-ui-react'
import NewOrder from './NewOrder'
import { graphql, gql, compose } from 'react-apollo'
import Moment from 'moment'

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
export class ActiveOrders extends React.Component {
    
    componentWillMount() {
        this.setState({
            deleteToggle: false,
            confirmOpen: false,
            confirmContent: 'No Order Set, likely error occured',
            paginationOffset: 5,
        })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('component did update called')
    //     if (this.props.activeOrdersQuery && this.props.activeOrdersQuery.loading === false) {
    //         this.props.activeOrdersQuery.refetch()
    //         console.log('refetched allOrders')
    //     }
    // }

    parseCell = (number) => (
        number.toString().replace(/(^\w{3})(\w{3})(\w{4})/g, (num,a,b,c) => `(${a})–${b}–${c}`)
    )

    handleDeleteToggle = () => this.setState( prevState => {
        return {deleteToggle: !prevState.deleteToggle}
    })

    contentForOrderDelete = (order) => {
        return `Delete order for ${order.user.name || 'n/a'}, ${this.parseCell(order.user.cell)} of $ ${order.total}?`
    }

    promptRemoveOrder = (order) => {
        this.setState({
            confirmOpen: true,
            confirmContent: this.contentForOrderDelete(order),
            orderToDeleteId: order.id
        })
    }

    confirmOrderDelete = async () => {
        await this.props.deleteOrderMutation({variables: {id: this.state.orderToDeleteId}}).then( res => {
            console.log(res, ' deleted.')
            this.setState({
                confirmOpen: false,
                confirmContent: 'No Order Set, likely error occured',
                orderToDeleteId: null
            })
            this.props.activeOrdersQuery.refetch()
        })
    }

    cancelOrderDelete = () => {
        this.setState({
            confirmOpen: false,
            confirmContent: 'No Order Set, likely error occured',
            orderToDeleteId: null
        })
    }

    manualUpdateOrders = () => {
        if (this.props.activeOrdersQuery && this.props.activeOrdersQuery.loading === false) {
            this.props.activeOrdersQuery.refetch()
            console.log('refetched allOrders')
        }
    }

    fetchMoreOrders = async () => {
        let length = this.props.activeOrdersQuery.allOrders.length
        await this.setState({ cursor: this.props.activeOrdersQuery.allOrders[length-1].id })
        await this.props.activeOrdersQuery.fetchMore({
            query: ACTIVE_ORDERS_QUERY_REFETCH,
            variables: {
                id: this.state.cursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                    ...previousResult,
                    allOrders: [ ...previousResult.allOrders, ...fetchMoreResult.allOrders],
                }
            },
        })
    }

    render() {
        if (this.props.activeOrdersQuery && this.props.activeOrdersQuery.loading) {
            return (
                <Container>
                    <Switch>
                        <Route path="/orders/new" component={NewOrder} />
                    </Switch>
                    <Segment clearing raised size='tiny' textAlign='center'>
                        <Header textAlign="left"> Recent Orders 
                            <Link to="/orders/new">
                                <Label attached='top right' 
                                    icon={{name: 'add', fitted: true, corner: true, size: 'large'}} 
                                    content='NEW' 
                                    size='small' /> 
                            </Link>
                        </Header>
                        <Segment basic loading raised attached='top'>
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                        </Segment>
                    </Segment>
                </Container>
            )
        }
        
        if (this.props.activeOrdersQuery && this.props.activeOrdersQuery.error) {
            return (
                <Container>
                    <Switch>
                        <Route path="/orders/new" component={NewOrder} />
                    </Switch>
                    <Segment clearing raised size='tiny' textAlign='center'>
                        <Header textAlign="left"> Recent Orders 
                            <Link to="/orders/new">
                                <Label attached='top right' 
                                    icon={{name: 'add', fitted: true, corner: true, size: 'large'}} 
                                    content='NEW' 
                                    size='small' /> 
                            </Link>
                        </Header>
                        <Segment basic raised attached='top'>
                            <Header as='h3'>Opps! Data Fetching Error</Header>
                        </Segment>
                    </Segment>
                </Container>
            )
        }

        return (
            <Container>
                <Switch>
                    <Route path="/orders/new" component={NewOrder} />
                </Switch>
                <Segment.Group>
                    <Segment clearing raised size='tiny' textAlign='center'>
                        <Header textAlign="left" as='h2'> Orders 
                            <Link to="/orders/new">
                                <Label attached='top right' 
                                    icon={{name: 'add', fitted: true, corner: true, size: 'large'}} 
                                    content='NEW' 
                                    size='small' /> 
                            </Link>
                        </Header>
                        {<Table basic unstackable compact textAlign='left' attached='bottom' cols={5}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.Cell colSpan={5} verticalAlign='bottom'>
                                        <Header as='h3'><em>Recent Orders</em></Header>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell textAlign='center'>
                                       <Button.Group basic compact>
                                            <Button icon='remove' size='mini' onClick={this.handleDeleteToggle}/>
                                            <Button icon='refresh' size='mini' onClick={this.manualUpdateOrders}/>
                                            {/* <Confirm  /> add confirm through state - open,  */}
                                            <Confirm 
                                                open={this.state.confirmOpen}
                                                content={this.state.confirmContent}
                                                onConfirm={this.confirmOrderDelete}
                                                onCancel={this.cancelOrderDelete}
                                            />
                                       </Button.Group>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell >Name</Table.HeaderCell>
                                    <Table.HeaderCell>Cell</Table.HeaderCell>
                                    <Table.HeaderCell>Product</Table.HeaderCell>
                                    <Table.HeaderCell>Total</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    this.props.activeOrdersQuery.allOrders.map( (order, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell textAlign='left'collapsing id={order.id}>
                                                    {this.state.deleteToggle === true && 
                                                    <Icon name='remove' link bordered size='large' onClick={ () => this.promptRemoveOrder(order)} />}
                                                    {`\t${Moment(order.createdAt).format('dddd, D/M')}`}
                                                </Table.Cell>
                                                <Table.Cell><Header as='h4'>{order.user.name || 'N/A'}</Header></Table.Cell>
                                                <Table.Cell><Header as='h4'>{this.parseCell(order.user.cell)}</Header></Table.Cell>
                                                <Table.Cell>
                                                    <List>
                                                        {order.quantities.map( (quantity, index) => 
                                                            <List.Item key={index}>
                                                                        {quantity.product.flower.name ||
                                                                         quantity.product.cartridge.name}{`:`}
                                                                        <h4 style={{display: 'inline'}}>
                                                                            { `  ${quantity.units}`}
                                                                        </h4>{`g`}
                                                            </List.Item>)}
                                                    </List>
                                                </Table.Cell>
                                                <Table.Cell><h4>$ {order.total}</h4></Table.Cell>
                                            </Table.Row>
                                        )}
                                    )
                                }
                            </Table.Body>
                        </Table>}
                    </Segment>
                    <Button attached='bottom' fluid content='More' onClick={this.fetchMoreOrders}/>
                </Segment.Group>
                <Divider hidden section />
            </Container>
       )
    }
}


export default compose(
    graphql(ACTIVE_ORDERS_QUERY, { name: 'activeOrdersQuery' }),
    graphql(DELETE_ORDER_MUTATION, {name: 'deleteOrderMutation'})
)(ActiveOrders)