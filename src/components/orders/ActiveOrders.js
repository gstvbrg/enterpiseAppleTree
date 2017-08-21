import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import {Segment, Header, Button, Table, Icon, Label} from 'semantic-ui-react'
import NewOrder from './NewOrder'


const ActiveOrderTableBody = () => {
    return (
        <Table.Body>
            <Table.Row>
                <Table.Cell>Gus</Table.Cell>
                <Table.Cell>9496831444</Table.Cell>
                <Table.Cell>Thursday 8/04/17 3:51pm</Table.Cell>
                <Table.Cell></Table.Cell>
            </Table.Row>
        </Table.Body>
    )
}

const ActiveOrderTable = () => {
    return (
        <Table collapsing compact unstackable >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Cell</Table.HeaderCell>
                    <Table.HeaderCell>Created</Table.HeaderCell>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <ActiveOrderTableBody />
        </Table>
    )
}

const ActiveOrdersSegment = () => (
    <Segment clearing raised size='tiny'>
        
        <Header textAlign="left"> Active Order 
            <Link to="/orders/new">
                <Label attached='top right' icon={{name: 'add', fitted: true, corner: true, size: 'large'}} content='NEW' size='small' /> 
            </Link>
        </Header>
        <ActiveOrderTable />
    </Segment>
)

export default class ActiveOrders extends React.Component {
    render() {
       return (
        <Switch>
            <Route path="/orders/new" component={NewOrder} />
            <ActiveOrdersSegment/>
        </Switch>
       )
    }
}