import React from 'react'
import { Segment, Divider, Tab } from 'semantic-ui-react'
import { graphql, gql } from 'react-apollo'
import FlowerTable from './FlowerTable'
import OilTable from './OilTable'

const PAST_INVENTORY_QUERY = gql`
query PastInventoryQuery {
    allProducts(filter:{
        units_lte: 0
    }){
        type 
        units
        flower {
            name
            strain
            productionMethod
            price {
                gramEighth
                gramQuarter
                gramHalf
                gramOunce
            }
        }
        cartridge {
            name
            strain
            mg
            price {
                unitPrice
            }
        }
    }
}`




class PastInventoryTable extends React.Component {

    render() {
        /* Loading */
        if (this.props.pastInventory && this.props.pastInventory.loading) {
            return (
                <div>
                    <Segment loading raised size='mini'>
                        <Divider hidden />
                        <Divider hidden />
                        <Divider hidden />
                    </Segment>
                </div>
            )
        }
        /* Error */
        if (this.props.pastInventory && this.props.pastInventory.error) {
            return <div>Opps! Data Fetching Error</div>
        }
        /* Past Inventory Table Setup */
        let pastFlowers = this.props.pastInventory.allProducts.filter(product => product.flower);
        let pastOils = this.props.pastInventory.allProducts.filter(product => product.cartridge);
        
        return (
            <div>
                <Segment raised size='mini'>
                <Tab menu={{ secondary: true, pointing: true }} panes={[
                    {
                        menuItem: 'Flower',
                        render: () => <FlowerTable flowers={pastFlowers} />
                    }, {
                        menuItem: 'Oil',
                        render: () => <OilTable oils={pastOils} />
                    }
                ]} />
                </Segment>
            </div>

        )
    }
}

export default graphql(PAST_INVENTORY_QUERY, {name: 'pastInventory'})(PastInventoryTable)