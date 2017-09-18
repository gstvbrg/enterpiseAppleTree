import React from 'react';
import { Header, Button, Segment, Table } from 'semantic-ui-react';
import { List } from 'immutable'
import Moment from 'moment'

export default class OrderSummary extends React.Component {

    constructor(){
        super()
    }

    componentWillMount() {
        const now = Moment().format("dddd, MMMM Do YYYY");
        this.setState({ now });
    }

    render() {
        return (
            <div>
                <Segment.Group>
                    <Header as='h1' attached='top'>
                        <Header.Content>
                            <em>Confirm Order</em>
                        </Header.Content>
                    </Header>
                    <Segment>
                        <Header as='h3' attached='top'><em>Order Summary</em></Header>
                        <Table basic
                               size='small'
                               singleLine
                               compact
                               unstackable
                               attached='bottom'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Items</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center' colSpan='three'>Quantity</Table.HeaderCell>
                                    <Table.HeaderCell>Cost</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Blue Dream</Table.Cell>
                                    <Table.Cell textAlign='center'>3.5gs</Table.Cell>
                                    <Table.Cell>$ 45</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Blue Dream</Table.Cell>
                                    <Table.Cell textAlign='center'>3.5gs</Table.Cell>
                                    <Table.Cell>$ 45</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell textAlign='right'><Header as='h4'>Total:</Header></Table.Cell>
                                    <Table.Cell textAlign='center'><Header as='h3'>7 gs</Header></Table.Cell>
                                    <Table.Cell><Header as='h3'>$ 90</Header></Table.Cell>
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
                                <Table.Row>
                                    <Table.Cell textAlign='right'><em>Total:</em></Table.Cell>
                                    <Table.Cell><Header as='h4'>${this.props.cartTotal}</Header></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Segment>
                    <Button.Group attached='bottom'>
                        <Button content="Edit" onClick={() => console.log(this.props)} />
                        <Button content="Submit" onClick={() => console.log(this.props)} />
                    </Button.Group>
                </Segment.Group>
            </div>
        )
    }
}