import React from 'react'
import { Segment, Divider, Tab } from 'semantic-ui-react'
import { graphql, gql } from 'react-apollo'
import FlowerTable from './FlowerTable'
import OilTable from './OilTable'

export const CurrentInventoryQuery = gql`
query CurrentInventory {
    allProducts(filter:{
        units_gt: 0
    }){
        id
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


class CurrentInventoryTable extends React.Component {

    render() {
        /* Loading */
        let loading = false;
        if (this.props.currentInventory && this.props.currentInventory.loading) {
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
        if (this.props.currentInventory && this.props.currentInventory.error) {
            return <div>Opps! Data Fetching Error</div>
        }

        /* Current Inventory Table Setup */
        let currentFlowers = this.props.currentInventory.allProducts.filter(product => product.flower);
        let currentOils = this.props.currentInventory.allProducts.filter(product => product.cartridge);

        return (
            <div>
                <Segment loading={loading} raised size='mini'>
                    <Tab menu={{ secondary: true, pointing: true }} panes={[
                        {
                            menuItem: 'Flower',
                            render: () => <FlowerTable flowers={currentFlowers} />
                        }, {
                            menuItem: 'Oil',
                            render: () => <OilTable oils={currentOils} />
                        }
                    ]} />
                </Segment>
            </div>

        )
    }
}

export default graphql(CurrentInventoryQuery, {name: 'currentInventory'})(CurrentInventoryTable)
