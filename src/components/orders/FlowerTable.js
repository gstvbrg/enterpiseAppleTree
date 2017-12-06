import React from 'react'
import { Table, Dropdown } from 'semantic-ui-react'
import { Map } from 'immutable'

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
        this.setState({ 
            options: [
                { 
                    key: `${data.name}-${data.value}g`, 
                    text: `${data.value}gs`, 
                    value: parseFloat(data.value)
                }, 
                ...this.state.options], 
        })
    }

    handleValueChange = (e, data) => {
        const currentValue = data.value.map( item => parseFloat(item) )
        this.setState({ currentValue })
        // Update Cart Total
        this.props.handleTotal(e, data)
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
            closeOnChange
            value={this.state.currentValue}
            name={this.props.product.flower.name} 
            additionLabel={<i style={{ color: 'red' }}>grams: </i>}
            onAddItem={this.addItemToOptions}
            onChange={this.handleValueChange}
            additionPosition={'top'}
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
        let value = data.value.reduce((sum, value) => sum + parseFloat(value), 0)
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