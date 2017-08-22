import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import { Map } from 'immutable'

export default class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.calcItemPrice = this.calcItemPrice.bind(this)
    }

    componentWillMount() {
        console.log('Component will Mount')
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

    calcItemPrice(name, value) {
        // Get Product Info 
        const productInfo = this.getProductObj(name)
        // Calculate Product Price 
        let price 
        if (productInfo.type === "FLOWER") {
            const productPrice = productInfo.flower.price
            if (value > 0 && value < 7){
                price = value * productPrice.gramEigth
            } else if (value >= 7 && value < 14) {
                price = value * productPrice.gramQuarter
            } else if (value >= 14 && value < 28) {
                price = value * productPrice.gramHalf
            } else if (value > 28) {
                price = value * productPrice.gramOunce
            } else {
                price = 0
            }
        } else if (productInfo.type === "OIL") {
            const productPrice = productInfo.cartridge.price
            if (value >= 0) {
                price = value * productPrice.unitPrice
            } else {
                price = 0
            }
        } else {
            return new Error('No associated price')
        }

        return price
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
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { this.props.flowers.entrySeq().map(([key, obj], index) => {
                    const value = obj.get('value')
                    const total = 10 * value
                    this.calcItemPrice(key, value)
                    return (<Table.Row key={index}>
                            <Table.Cell>{key}</Table.Cell>
                            <Table.Cell>{value} g</Table.Cell>
                            <Table.Cell>${total}</Table.Cell>
                        </Table.Row>)
                    })}
                </Table.Body>
                <Table.Footer>
                    <Table.Row textAlign='right'>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}