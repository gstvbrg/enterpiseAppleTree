import React from 'react';
import { Table, Header, Button, Icon, Input } from 'semantic-ui-react';
// import { List } from 'immutable'
import { Link } from 'react-router-dom'
// import OrderSummary from './OrderSummary'
import { validateName, validateCell } from './NewOrder'
import { Map } from 'immutable'

export default class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cartItems: 
                this.props.flowers.entrySeq().map(([key, obj]) => ({
                    name: key,
                    units: obj.get('value'),
                    id: obj.get('id'),
                    itemTotal: this.getItemPrice(key, obj.get('value')),
                })),
            cartTotal: this.props.flowers.entrySeq().reduce( (sum, flower) => sum + this.getItemPrice(flower[0], flower[1].get('value')), 0.0),
            adjustments: new Map(),
        }
        this.handelAdjustment = this.handelAdjustment.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            cartItems: 
                nextProps.flowers.entrySeq().map(([key, obj], index) => ({
                    name: key,
                    units: obj.get('value'),
                    id: obj.get('id'),
                    itemTotal: this.getItemPrice(key, obj.get('value')),
                })),
            cartTotal: nextProps.flowers.entrySeq().reduce( (sum, flower) => sum + this.getItemPrice(flower[0], flower[1].get('value')), 0.0),
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

    async handelAdjustment(index, sign, item) {
        const prevVal = parseFloat(this.state.adjustments.get(`${index}-adjust`))
        const prop = `${index}-adjust`
        const newVal = sign * prevVal
        await this.setState({adjustments: this.state.adjustments.set(prop, newVal )})
        const adjustmentsReduced = this.state.adjustments.reduce((sum, val) => parseFloat(val) + parseFloat(sum), 0)
        this.setState({
            adjustedCartTotal: adjustmentsReduced + this.state.cartTotal,
            discount: adjustmentsReduced
        })
    }

    render() {
        const validName = validateName(this.props.name)
        const validCell = validateCell(this.props.cell)
        return (
            <Table size='small' unstackable basic columns={5}>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell singleLine colSpan='5'>
                            <Header as='h5' icon='shop' content='Shopping Cart'/>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Product</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center' colSpan={2}>Discount</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { this.isCartEmpty() ? (
                        <Table.Row>
                            <Table.Cell colSpan='5' textAlign='center' negative ><Icon disabled name='attention' size='large'color='red'/><b> EMPTY CART </b></Table.Cell>    
                        </Table.Row>                   
                    ) : (
                        this.state.cartItems.map( (item, index) => {
                            if (item.units > 0) {
                            return (<Table.Row key={index}>
                                        <Table.Cell collapsing textAlign='center'>{item.name}</Table.Cell>
                                        <Table.Cell collapsing textAlign='center'>{item.units} g</Table.Cell>
                                        <Table.Cell collapsing >$ {item.itemTotal}</Table.Cell>
                                        <Table.Cell selectable>
                                            <Input  fluid
                                                    onChange={(e, data) => this.setState({adjustments: this.state.adjustments.set(`${index}-adjust`, e.target.value)})}
                                            />
                                        </Table.Cell>
                                        <Table.Cell >  
                                            <Button.Group compact vertical size='small'>
                                                <Button content='+' onClick={() => this.handelAdjustment(index, 1, item)} />
                                                <Button content='–' onClick={() => this.handelAdjustment(index, -1, item)}/>
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>)
                            } else return false 
                        })
                    )}
                    <Table.Row>
                        <Table.Cell></Table.Cell>
                        <Table.Cell textAlign='center'><Header as='h5'><em>Total</em></Header></Table.Cell>
                        <Table.Cell><Header as='h5'><em>$ {this.state.cartTotal}</em></Header></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                    { this.state.adjustedCartTotal &&
                        <Table.Row>
                            <Table.Cell textAlign='right' colSpan='2'><Header as='h5'><em>Adjustment</em></Header></Table.Cell>
                            <Table.Cell>
                                <Header as='h5' color={this.state.discount < 0 ? 'red': 'green'}>
                                    <em>( {this.state.discount} )</em>
                                </Header>
                            </Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    }{ this.state.adjustedCartTotal &&
                        <Table.Row>
                            <Table.Cell textAlign='right' colSpan='2'><Header as='h5'><em>Adjusted Total</em></Header></Table.Cell>
                            <Table.Cell><Header as='h5'><em>$ {this.state.adjustedCartTotal}</em></Header></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    }
                </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                        { this.isCartEmpty() || !validName || !validCell ?
                            (<Table.Cell colSpan='5' textAlign='center' selectable singleLine>
                                <Button basic color='red' fluid disabled>
                                    <Header as='h3' color='red'>
                                        <em>Submit</em>
                                    </Header>    
                                </Button>
                             </Table.Cell>)
                        :   (<Table.Cell colSpan='5' textAlign='center' selectable singleLine>
                                <Link to={{ 
                                pathname: '/orders/new/summary', 
                                replace: true,
                                state: {
                                    cartItems: this.state.cartItems.toJS(),
                                    cartTotal: this.state.adjustedCartTotal || this.state.cartTotal,
                                    name: this.props.name,
                                    cell: parseFloat(this.props.cell.replace(/\D/g,'')),
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