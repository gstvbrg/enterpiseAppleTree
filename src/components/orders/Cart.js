import React from 'react';
import { Table, Header, Button, Icon } from 'semantic-ui-react';
import { List } from 'immutable'
import { Route, Link } from 'react-router-dom'
import OrderSummary from './OrderSummary'

export default class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cartItems: 
                this.props.flowers.entrySeq().map(([key, obj]) => ({
                    name: key,
                    units: obj.get('value'),
                    itemTotal: this.getItemPrice(key, obj.get('value')),
                })),
            cartTotal: this.props.flowers.entrySeq().reduce( (sum, flower) => sum + this.getItemPrice(flower[0], flower[1].get('value')), 0.0)
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            cartItems: 
                nextProps.flowers.entrySeq().map(([key, obj], index) => ({
                    name: key,
                    units: obj.get('value'),
                    itemTotal: this.getItemPrice(key, obj.get('value')),
                })),
            cartTotal: nextProps.flowers.entrySeq().reduce( (sum, flower) => sum + this.getItemPrice(flower[0], flower[1].get('value')), 0.0)
        })
    }

    getProductObj = (name) => (
        this.props.currentInventory.allProducts.find( product => {
            if (product.flower) {
                return product.flower.name === name
            } else if (product.cartridge) {
                return product.cartridge.name === name
            } else {
                return false 
            }
        })
    ) 

    calcFlowerPrice = (productInfo, value) => {
        let price = 0 //Default 
        if (productInfo.type === "FLOWER") {
            const productPrice = productInfo.flower.price
            if (value > 0 && value < 7){
                price = value * productPrice.gramEighth
            } else if (value >= 7 && value < 14) {
                price = value * productPrice.gramQuarter
            } else if (value >= 14 && value < 28) {
                price = value * productPrice.gramHalf
            } else if (value >= 28) {
                price = value * productPrice.gramOunce
            } 
        }
        return parseInt(price)
    }

    calcCartridgePrice = (productInfo, value) => {
        let price = 0
        const productPrice = productInfo.cartridge.price
        if (value >= 0) {
            price = value * productPrice.unitPrice
        }
        return parseInt(price)
    }

    getItemPrice = (name, value) => {
        // Get Product Info 
        const productInfo = this.getProductObj(name)
        // Calculate Price According to Quantiy
        let price 
        if (productInfo.type === "FLOWER") {
            price = this.calcFlowerPrice(productInfo, value)
        } else if (productInfo.type === "OIL") {
            price = this.calcCartridgePrice(productInfo, value)
        } else {
            return new Error('No associated price')
        }
        return parseInt(price)
    }

    isCartEmpty = () => (
        this.state.cartItems.reduce( (sum, item) => sum + item.units, 0) <= 0
    )

    sendItemsUp = () => {
        let items = [...this.state.cartItems]
        this.props.addCartItemToOrder(items)
    }

    render() {
        return (
            <Table size='small' unstackable basic>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell singleLine>
                            <Header as='h5' icon='shop' content='Shopping Cart'/>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Product</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { this.isCartEmpty() ? (
                        <Table.Row>
                            <Table.Cell colSpan='3' textAlign='center' negative ><Icon disabled name='attention' size='large'color='red'/><b> EMPTY CART </b></Table.Cell>    
                        </Table.Row>                   
                    ) : (
                        this.state.cartItems.map( (item, index) => {
                            if (item.units > 0) {
                                return (<Table.Row key={index}>
                                            <Table.Cell textAlign='center'>{item.name}</Table.Cell>
                                            <Table.Cell textAlign='center'>{item.units} g</Table.Cell>
                                            <Table.Cell>$ {item.itemTotal}</Table.Cell>
                                        </Table.Row>)
                            }
                        })
                    )}
                    <Table.Row>
                        <Table.Cell></Table.Cell>
                        <Table.Cell textAlign='right'><Header as='h5'><em>Total</em></Header></Table.Cell>
                        <Table.Cell><Header as='h5'><em>$ {this.state.cartTotal}</em></Header></Table.Cell>
                    </Table.Row>
                    {/* <Table.Row>
                        { this.isCartEmpty() ?
                            (<Table.Cell colSpan='3' textAlign='center' error selectable singleLine>
                                <Button basic fluid attached='bottom' disabled ><Header as='h3' color='red'><em>Submit</em></Header></Button>
                             </Table.Cell>)
                        :   (<Table.Cell colSpan='3' textAlign='center' selectable singleLine>
                                <Button basic fluid attached='bottom' onKeyPress  ={console.log('click')}>
                                    <Header as='h3' color='green'><em>Submit</em></Header>
                                </Button>
                             </Table.Cell>)
                        }
                    </Table.Row> */}
                </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                        { this.isCartEmpty() ?
                            (<Table.Cell colSpan='3' textAlign='center' selectable singleLine>
                                <Link to={{pathname: "/orders/new/summary", state: {cartItems: this.state.cartItems} }}>
                                    <Button basic color='red' fluid disabled>
                                        <Header as='h3' color='red'>
                                            <em>Submit</em>
                                        </Header>    
                                    </Button>
                                </Link>
                             </Table.Cell>)
                        :   (<Table.Cell colSpan='3' textAlign='center' selectable singleLine>
                                <Link to={{ pathname: '/orders/new/summary', state: {
                                    cartItems: this.state.cartItems.toJS(),
                                    cartTotal: this.state.cartTotal
                                } }}>
                                    <Button basic fluid onClick={this.sendItemsUp}>
                                        <Header as='h3' color='green'><em>Submit</em></Header>
                                    </Button>
                                </Link>
                             </Table.Cell>)
                        }
                        </Table.Row>
                    </Table.Footer>
            </Table>
        )
    }
}