import React from 'react'
import { Table, Label } from 'semantic-ui-react'

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
        <Label size='mini' color={color} content={content}/>
    )
}

const ProductionLabel = (props) => {
    let content = "";
    switch(props.prod) {
        case "INDOOR":
            content = "IN"
            break
        case "OUTDOOR": 
            content = "OUT"
            break
        case "GREENHOUSE":
            content = "GH"
            break
        case "HYDRO":
            content = "DRO"
            break
        default:
            content = "OUTDOOR"
    }
    return (
        <Label size='mini' color="grey" content={content}/>
    )
}

const FlowerTableBody = (props) => {
    return (
        <Table.Body> 
            {props.products.map( (product) => (
                <Table.Row key={product.flower.name}>
                    <Table.Cell>{product.flower.name}</Table.Cell>
                    <Table.Cell><StrainLabel type={product.flower.strain} /></Table.Cell>
                    <Table.Cell><ProductionLabel prod={product.flower.productionMethod} /></Table.Cell>
                    <Table.Cell>{Math.round((product.flower.price.gramEighth) * 3.5)}</Table.Cell>
                    <Table.Cell>{Math.round((product.flower.price.gramQuarter) * 7)}</Table.Cell>
                    <Table.Cell>{Math.round((product.flower.price.gramHalf) * 14)}</Table.Cell>
                    <Table.Cell>{Math.round((product.flower.price.gramOunce) * 28.1)}</Table.Cell>
                    <Table.Cell>{product.units}</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    )
}

const FlowerTable = (props) => {
    return (
        <Table unstackable singleLine>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Prod</Table.HeaderCell>
                    <Table.HeaderCell>1/8</Table.HeaderCell>
                    <Table.HeaderCell>1/4</Table.HeaderCell>
                    <Table.HeaderCell>1/2</Table.HeaderCell>
                    <Table.HeaderCell>1oz</Table.HeaderCell>
                    <Table.HeaderCell>Units</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <FlowerTableBody products={props.flowers} />
        </Table>
    )
}

export default FlowerTable