import React from 'react';
import { Tab, Divider, Header, Segment, Loader, Dimmer, Message } from 'semantic-ui-react';
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

    sendItemToCart(name, value, id) {
        this.setState( prevState => ({
            flowers: prevState.flowers.setIn([ name, 'value'], value).setIn([name, 'id'], id)
        }))
    }

    render () {
        /* Loading */
        if (this.props.currentInventory && this.props.currentInventory.loading) {
            return <Loading />
        }
        /* Error */
        if (this.props.currentInventory && this.props.currentInventory.error) {
            return (
                <Message negative
                    header='Dang! the menu didnt load!'
                    content='Sorry for the inconvenience'
                    list={['double check your network connection',
                            'try again in few mins']}
                />
            )
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
                { true && 
                    <Cart 
                        currentInventory={this.props.currentInventory} 
                        flowers={this.state.flowers}
                        addCartItemToOrder={this.props.addCartItemToOrder}
                        name={this.props.name}
                        cell={this.props.cell}
                        date={this.props.date}
                        currentFlowers={currentFlowers}
                    />}
            </div>
        )
    }
}


export default NewOrderMenu