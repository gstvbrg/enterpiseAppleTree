import React from 'react'
import { Table, Dropdown } from 'semantic-ui-react'
import { Map } from 'immutable'

// const StrainLabel = (props) => {
//     let color = "", 
//         content = "";

//     switch(props.type) {
//         case "Sativa":
//             color = "red"
//             content = "S"
//             break
//         case "Indica": 
//             color = "blue"
//             content = "I"
//             break
//         case "Hybrid":
//             color = "purple"
//             content = "H"
//             break
//         default: 
//             color = "purple"
//             content = "H"
//     }
//     return (
//         <Label size='mini' color={color} content={content}/>
//     )
// }

// const ProductionLabel = (props) => {
//     let content = "";
//     switch(props.prod) {
//         case "INDOOR":
//             content = "IN"
//             break
//         case "OUTDOOR": 
//             content = "OUT"
//             break
//         case "GREENHOUSE":
//             content = "GH"
//             break
//         case "HYDRO":
//             content = "DRO"
//             break
//         default:
//             content = "OUTDOOR"
//     }
//     return (
//         <Label size='mini' color="grey" content={content}/>
//     )
// }

class QuanityPriceSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentValue: [],
            options: [ 
                {key: `${this.props.product.flower.name}-eighth`, text: 'eighth', value: 3.5, id: `${props.product.id}`},
                {key: `${this.props.product.flower.name}-quarter`, text: 'quarter', value: 7},
                {key: `${this.props.product.flower.name}-half`, text: 'half', value: 14},
                {key: `${this.props.product.flower.name}-ounce`, text: 'ounce', value: 28.1},
            ]
        }
    }

    addItemToOptions = (e, data) => {
        const newItem = { 
                    key: `${data.name}-${data.value}g`, 
                    text: data.value, 
                    value: parseFloat(data.value)
                }
        const filteredOptions = data.options.filter((item) => item.text === newItem.text)
        if (filteredOptions.length === 0) {
            this.setState({
                options: data.options.concat(newItem)
            })
        }
    }

    handleValueChange = (e, data) => {
        const filteredValue = data.value.filter( item => typeof(item) === 'number')
        this.setState({currentValue: filteredValue })    
        this.props.handleTotal(e, {filteredValue, ...data})
    }

    renderLabel = label => ({
        content: `${label.text}`
    })

    render() {
        return (
            <Dropdown 
            options={this.state.options} 
            placeholder='Amt'
            search 
            selection
            fluid 
            multiple
            allowAdditions
            closeOnBlur
            value={this.state.currentValue}
            name={this.props.product.flower.name} 
            additionLabel={<i style={{ color: 'red' }}>grams: </i>}
            onAddItem={this.addItemToOptions}
            onChange={this.handleValueChange}
            onClick={this.handleEnter}
            />
        )
    }
}


export default class FlowerTable extends React.Component {

    componentWillMount() {
        this.setState({
            flowers: new Map()
        })
    }

    handleTotal = (evt, data) => {
        let name = data.name
        let id = (this.props.flowers.find((obj) => obj.flower.name === name)).id
        let value = data.filteredValue.reduce((sum, value) => sum + parseFloat(value), 0)
        this.props.sendItemToCart(name, value, id)
    }

    render() {
        return (
            <Table unstackable singleLine columns={2} size='small'>
                <Table.Header>
                    <Table.Row textAlign='right'>
                        <Table.HeaderCell>Strain</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body> 
                {this.props.flowers.map( (product) => (
                    <Table.Row key={product.flower.name}>
                        <Table.Cell textAlign='right'>{product.flower.name}</Table.Cell>
                        <Table.Cell><QuanityPriceSelector product={product} handleTotal={this.handleTotal} /></Table.Cell>
                    </Table.Row>)
                )}
                </Table.Body>
                { this.props.footer }
            </Table>
        )
    }
}