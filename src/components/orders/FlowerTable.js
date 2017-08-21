import React from 'react'
import { Table, Label, Dropdown, Button, Icon } from 'semantic-ui-react'

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

const QuanityPriceSelector = (props) => {
    const options = [ 
        {key: `${props.product.flower.name}-eighth`, text: '1/8th', value: 3.5, id: `${props.product.id}`},
        {key: `${props.product.flower.name}-quarter`, text: '1/4th', value: 7},
        {key: `${props.product.flower.name}-half`, text: 'half', value: 14},
        {key: `${props.product.flower.name}-ounce`, text: 'ounce', value: 28.1},
    ]
    return (
        <Dropdown placeholder='Amt  ' fluid multiple search selection allowAdditions closeOnChange name={props.product.flower.name} additionLabel={<i style={{ color: 'red' }}>Input Grams: </i>} 
        options={options} onChange={props.handleTotal} onAddItem={(e, {value}) => options.concat([{key: props.product.flower.name,text: value, value}])} />
    )
}


export default class FlowerTable extends React.Component {
    constructor(props){
        super(props)
        this.handleTotal = this.handleTotal.bind(this)
    }

    componentWillMount() {
        this.setState({
            name: '',
            value: 0,
        })
    }

    handleTotal = (evt, data) => {
        let name = data.name.replace(/ /g,'')
        let value = data.value.reduce((sum, value) => sum + value, 0)
        console.log(data.options[0].id)
        this.setState({name, value})
    }

    buttonTest = (evt, data) => {
        evt.preventDefault()
        console.log('click')
    }

    render() {
        const {name, value} = this.state
        return (
            <Table unstackable size='small'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Strain</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Prod</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell collapsing></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body> 
                {this.props.flowers.map( (product) => {
                    return (
                    <Table.Row key={product.flower.name}>
                        <Table.Cell>{product.flower.name}</Table.Cell>
                        <Table.Cell><StrainLabel type={product.flower.strain} /></Table.Cell>
                        <Table.Cell><ProductionLabel prod={product.flower.productionMethod} /></Table.Cell>
                        <Table.Cell><QuanityPriceSelector product={product} handleTotal={this.handleTotal} /></Table.Cell>
                        <Table.Cell><Button icon circular size='mini' color='green' onClick={() => this.props.sendItemToCart(this.state.name, this.state.value)}><Icon name='add'/></Button></Table.Cell>
                    </Table.Row>)
                })}
                </Table.Body>
                { this.props.footer }
            </Table>
        )
    }
}