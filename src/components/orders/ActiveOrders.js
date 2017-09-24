import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Container, Segment, Header, Table, Label, Divider, List, Checkbox, Button } from 'semantic-ui-react'
import NewOrder from './NewOrder'
import { graphql, gql } from 'react-apollo'
import Moment from 'moment'

const ACTIVE_ORDERS_QUERY = gql`
    query ActiveOrdersQuery {
        allOrders(
            filter: {
                isActive: true 
            }
            orderBy: createdAt_ASC
            first: 10
        ){
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
    }`


export class ActiveOrders extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            open: this.props.open || false,
            numStars: 4,
        }
    }
    
    parseCell = (number) => (
        number.toString().replace(/(^\w{3})(\w{3})(\w{4})/g, (num,a,b,c) => `(${a})–${b}–${c}`)
    )

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
                <Segment clearing raised size='tiny' textAlign='center'>
                    <Header textAlign="left" as='h2'> Orders 
                        <Link to="/orders/new">
                            <Label attached='top right' 
                                icon={{name: 'add', fitted: true, corner: true, size: 'large'}} 
                                content='NEW' 
                                size='small' /> 
                        </Link>
                    </Header>
                    {<Table basic unstackable compact textAlign='left'>
                        <Table.Header>
                            <Table.Row>
                                <Table.Cell colSpan={6} verticalAlign='bottom'>
                                    <Header as='h3'><em>Active Orders</em></Header>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>
                                   <Button icon='refresh'/>
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
                                <Table.HeaderCell>Cell</Table.HeaderCell>
                                <Table.HeaderCell>Product</Table.HeaderCell>
                                <Table.HeaderCell>Total</Table.HeaderCell>
                                <Table.HeaderCell>Created</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                this.props.activeOrdersQuery.allOrders.map( (order, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell textAlign='right' collapsing>
                                                <Checkbox 
                                                    fitted 
                                                    style={{display: 'inline-block'}}
                                                    label={{ children: `${index + 1}.`}}
                                                />
                                            </Table.Cell>
                                            <Table.Cell textAlign='center'><Header as='h4'>{order.user.name || 'N/A'}</Header></Table.Cell>
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
                                            <Table.Cell>{Moment(order.createdAt).format('ddd d – M/YY')}</Table.Cell>
                                        </Table.Row>
                                    )}
                                )
                            }
                        </Table.Body>
                    </Table>}
                </Segment>
            </Container>
       )
    }
}

export default graphql(ACTIVE_ORDERS_QUERY, { name: 'activeOrdersQuery' })(ActiveOrders)