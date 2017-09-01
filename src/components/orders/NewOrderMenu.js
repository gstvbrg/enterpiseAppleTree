import React from 'react';
import { Tab, Divider, Header, Segment, Loader, Dimmer } from 'semantic-ui-react';
import { Map } from 'immutable'
import FlowerTable from './FlowerTable'
import OilTable from './OilTable'
import Cart from './Cart'

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

class NewOrderMenu extends React.Component {
    constructor(props){
        super(props)
        this.sendItemToCart = this.sendItemToCart.bind(this)
    }

    componentWillMount() {
        this.setState({
            flowers: new Map()
        })
    }

    sendItemToCart(name, value) {
        this.setState( prevState => ({
            flowers: prevState.flowers.setIn([ name, 'value'], value)
        }))
    }

    render () {
        /* Loading */
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
            {menuItem: 'Flowers', render: () => <FlowerTable flowers={currentFlowers} sendItemToCart={this.sendItemToCart} />},
            {menuItem: 'Oil', render: () => <OilTable cartridges={currentOils} />}
        ]

        return (
            <div>
                <Header size='medium' textAlign='left'>Menu</Header>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                { this.state.flowers.size > 0 && 
                    <Cart 
                        currentInventory={this.props.currentInventory} 
                        flowers={this.state.flowers}
                        addCartItemToOrder={this.props.addCartItemToOrder}
                    />}
            </div>
        )
    }
}


export default NewOrderMenu