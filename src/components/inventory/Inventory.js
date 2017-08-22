import React from 'react'
import { Divider, Tab } from 'semantic-ui-react'
import CurrentInventoryTable from './CurrentInventoryTable'
import PastInventoryTable from './PastInventoryTable'

export default class Inventory extends React.Component {
    render() {
        return (
            <div>
                <Divider hidden />
                <Tab menu={{ widths: 2, borderless: true}} panes={[
                    {
                        menuItem: 'Current Inventory',
                        render: () => <CurrentInventoryTable />
                    },
                    {
                        menuItem: 'Past Inventory',
                        render: () => <PastInventoryTable />
                    }
                ]} />
            </div>
        )
    }
}