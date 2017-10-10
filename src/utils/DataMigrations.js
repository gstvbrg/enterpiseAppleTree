import React from 'react'
import { gql, graphql, compose } from 'react-apollo'
import { Container, Segment, Button } from 'semantic-ui-react'
import Moment from 'moment'

const EXSISTING_ORDERS_QUERY = gql`
    query {
        allOrders {
            id 
            createdAt
            date
        }
    }
`

const MERGE_CREATEDAT_WITH_DATE = gql`
    mutation mergeCreateAtWithDate($id: ID!, $date: String!){
        updateOrder(
            id: $id,
            date: $date
        ){
            id
        }
    }
`

class DataMutationHackButton extends React.Component {

    DataMergeScript = (e) => {
        e.preventDefault()
        this.props.data.allOrders.map( async (order) => {
            if (order.date) {
                let id = order.id
                let date = Moment.utc(order.createdAt).format("YYYYMMDDhhmma")
                await this.props.mergeCreatedAtWithDate({
                    variables: {
                        id,
                        date
                    }
                }).then(response => console.log(response))
            }
        })
    }

    render() {
        return (
            <Container>
                <Segment>
                    <Button onClick={this.DataMergeScript}>HACK IT UP SON</Button>
                </Segment>
            </Container>
        )
    }
}

const DataMutationHackScript = compose(
    graphql(EXSISTING_ORDERS_QUERY),
    graphql(MERGE_CREATEDAT_WITH_DATE, {name: 'mergeCreatedAtWithDate'}),
)(DataMutationHackButton)

export default DataMutationHackScript