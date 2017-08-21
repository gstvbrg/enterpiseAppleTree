import React from 'react';
import { Tab, Table, Divider, Header, Select, Button, Segment, Loader, Dimmer } from 'semantic-ui-react';
import FlowerTable from './FlowerTable'
import OilTable from './OilTable'


const Loading = () => (
    <div>
        <Header size='medium' textAlign='left'>Menu</Header>
        <Segment raised size='mini'>
            <Divider hidden />
            <Dimmer active inverted><Loader content='Loading' /></Dimmer>
            <Divider hidden />
        </Segment>
    </div>
)


const MenuFooter = (props) => {
    return (
        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell colSpan='3' />
                <Table.HeaderCell colSpan='2'>Total</Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    )
}


class OrderMenu extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.sendItemToCart = this.sendItemToCart.bind(this)
    }

    sendItemToCart(name, value) {
        this.setState({name, value})
    }

    render () {
        /* Loading */
        let loading = false;
        if (this.props.currentInventory && this.props.currentInventory.loading) {
            return <Loading />
        }
        /* Error */
        if (this.props.currentInventory && this.props.currentInventory.error) {
            return <div>Opps! Data Fetching Error</div>
        }

        /* Current Inventory Table Setup */
        let currentFlowers = this.props.currentInventory.allProducts.filter(product => product.flower);
        let currentOils = this.props.currentInventory.allProducts.filter(product => product.cartridge);

        
        const panes = [
            {menuItem: 'Flowers', render: () => <FlowerTable flowers={currentFlowers} footer={<MenuFooter/>} sendItemToCart={this.sendItemToCart} />},
            {menuItem: 'Oil', render: () => <OilTable cartridges={currentOils} />}
        ]

        return (
            <div>
                <Header size='medium' textAlign='left'>Menu</Header>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </div>
        )
    }
}


export default OrderMenu