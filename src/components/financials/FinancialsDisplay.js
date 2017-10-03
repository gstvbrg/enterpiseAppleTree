import React from 'react'
import { Container, Segment, Header, List, Dimmer, Loader, Table } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import { graphql, gql } from 'react-apollo'

const REVENUE_QUERY = gql`
    query {
        allOrders {
        total
        quantities {
            product {
            type
            unitPrice
            units
            }
            units
        }
        }
    }
`

class FinancialsDisplay extends React.Component {
        
    render() {
        if (this.props.revenueQuery && this.props.revenueQuery.loading) {
            return (
                <Container>
                    <Segment.Group>
                        <Header as='h2' attached='top'>
                            Financials
                        </Header>
                        <Segment>
                            <Loader active inline='centered' />
                        </Segment>
                    </Segment.Group>
                </Container>
            )
        }

        if (this.props.revenueQuery.allOrders) {
            var revenue = this.props.revenueQuery.allOrders.reduce((sum, obj) => sum + obj.total, 0)
            var cost = this.props.revenueQuery.allOrders.reduce( (sum, obj) => {
                return sum + (obj.quantities.reduce( (sum, obj) => {
                                return sum  + (obj.units * obj.product.unitPrice)
                              }, 0))
            },0)
            var profit = revenue - cost
        }

        return (
            <Container>
                <Segment.Group>
                    <Header as='h2' attached='top'>
                        Financials
                    </Header>
                    <Segment>
                        <Table basic='very' unstackable compact>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell textAlign='right'>Revenue</Table.Cell>
                                    <Table.Cell>${Math.round(revenue)}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell textAlign='right'>Cost</Table.Cell>
                                    <Table.Cell>({Math.round(cost)})</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell textAlign='right'>Profit</Table.Cell>
                                    <Table.Cell>${Math.round(profit)}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Segment>
                </Segment.Group>
            </Container>
        )
    }
}

export default graphql(REVENUE_QUERY, {name: 'revenueQuery'})(FinancialsDisplay)