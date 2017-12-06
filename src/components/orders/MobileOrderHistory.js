import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Container, 
         Segment, 
         Header,
         Divider,
         Button,
         Icon,
         Accordion,
         Confirm } from 'semantic-ui-react'
import NewOrder from './NewOrder'
import { gql } from 'react-apollo'
import Moment from 'moment'

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
}`

export default class MobileOrderHistory extends React.Component {

    componentWillMount() {
        this.setState({
            deleteToggle: false,
            confirmOpen: false,
            confirmContent: 'No Order Set, likely error occured',
            paginationOffset: 5,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeOrdersQuery.loading === false) {
            this.setState({
                panels: this.setPanels(nextProps.activeOrdersQuery.allOrders)
            })
        }
    }

    setPanels = (orders) => {
        const panels = orders.map( (order, index) => {
            return ({
                title: {
                    content: 
                    (<Header as='h5' style={{display: 'inline'}}>
                        { this.props.deleteToggle === true && <Icon name='remove' link bordered size='mini' onClick={ () => this.promptRemoveOrder(order)} />}
                        {`${this.parseDate(order.date)} – ${order.user.name || this.parseCell(order.user.cell)}`}
                    </Header>),
                    key: `title-${index}`,
                },
                content: {
                    content:
                    (<dl style={{listStyleType: 'none', margin: '0'}} key={`info-${index}`}>
                        <dt>Products</dt>
                            {order.quantities.map( (item,index) => 
                                <dd key={index}>{item.product.flower.name || item.product.cartridge.name}: <em>{item.units} gs</em></dd>
                            )}
                        <dt>Total</dt>
                        <dd>$ <em>{order.total}</em></dd>
                    </dl>),
                    key: `content-${index}`,
                }
            })
        })
        return panels
    }

    parseDate = (dateString) => (
        Moment(dateString, "YYYYMMDDhhmma").format("ddd [[]hh:mma[]]")
    )

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
        
        return (
            <Container>
                <Switch>
                    <Route path="/orders/new" component={NewOrder} />
                </Switch>
                <Segment.Group>
                    <Button.Group basic attached='top'>
                        <Button icon='remove' size='mini' onClick={this.handleDeleteToggle}/>
                        <Button icon='refresh' size='mini' onClick={this.manualUpdateOrders}/>
                        <Button
                            as={Link} 
                            to='/orders/new'
                            icon={{name: 'add', fitted: true, corner: true, size: 'large'}}
                            size='mini'
                        />
                        <Confirm 
                            open={this.state.confirmOpen}
                            content={this.state.confirmContent}
                            onConfirm={this.confirmOrderDelete}
                            onCancel={this.cancelOrderDelete}
                        />
                    </Button.Group>                            
                    <Segment raised size='tiny' textAlign='left'>
                        <Header textAlign="left" as='h2'> Recent Orders </Header>
                        <Accordion styled panels={this.setPanels(this.props.activeOrdersQuery.allOrders)} />
                    </Segment>
                    <Button attached='bottom' fluid content='More' onClick={this.fetchMoreOrders}/>
                </Segment.Group>
                <Divider hidden section />
            </Container>
       )
    }
}