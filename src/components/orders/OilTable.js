import React from 'react'
import { Table, Label, Message, Icon } from 'semantic-ui-react'

const StrainLabel = (props) => {
    let color = "", 
        content = "";

    switch(props.type) {
        case "Sativa":
            color = "red"
            content = "S"
            break
        case "Indica": 
            color = "blue"
            content = "I"
            break
        case "Hybrid":
            color = "purple"
            content = "H"
            break
        default:
            color = "purple"
            content = "H"
    }
    return (
        <Label size='tiny' color={color} content={content}/>
    )
}

const OilTableBody = (props) => {
    return (
        <Table.Body> 
            {props.products.map( (product, index) => (
                <Table.Row key={index}>
                    <Table.Cell>{product.cartridge.name}</Table.Cell>
                    <Table.Cell><StrainLabel type={product.cartridge.strain}/></Table.Cell>
                    <Table.Cell>{product.cartridge.mg}mg</Table.Cell>
                    <Table.Cell>{product.cartridge.price.unitPrice}</Table.Cell>
                    <Table.Cell>{product.units}</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    )
}

const OilTable = (props) => {

    if (!props.oil) {
        return (
            <Message floating negative size='large'>Out of Stock <Icon name='frown'size='large' /></Message>
        )
    } else {
        return (
            <Table unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Size</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Units</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <OilTableBody products={props.oils}/>
            </Table>
        )        
    }
}

export default OilTable