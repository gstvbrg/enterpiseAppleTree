// Selection 
// Basic Enter(), EXIT().REMOVE() pattern should work 

// X-AXIS SETUP
// Convert date string from props into D3 format
// Create Time Scale, mapping specified date range to width of display with reasonable intervals(ticks)
// Use TimeScale as bottomAxis input 

// Y-AXIS SETUP 
// nest Orders according to date 
// create scale for date.totals[Arr] 
// Use Totals as leftAxis input 

import React from 'react'
import Moment from 'moment'
import {
    Segment
} from 'semantic-ui-react'
import * as d3 from 'd3'


export default class DateGraph extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            width: 300,
            height: 150
        }
    }

    convertDateString = (date) => {
        return Moment(Moment(date, 'YYYYMMDDhhmma').format('YYYYMMDD')).toDate()
    }
    
    createDateTotalObj = (orders) => {
        const dateTotalObj = {}
        orders.forEach( order => {
            let date = order.date.slice(0,8)
            dateTotalObj[date] === undefined 
                ? dateTotalObj[date] = {
                    date: this.convertDateString(order.date),
                    total: order.total,
                }
                : dateTotalObj[date].total = dateTotalObj[date].total + order.total
        })
        return dateTotalObj
    }

    getDateDomainExtent = (dateTotalObj) => {
        var dateArr = []
        Object.entries(dateTotalObj).forEach(([key, obj]) => dateArr.push(dateTotalObj[key].date))
        return d3.extent(dateArr)
    }

    // getDateRangeExtent = (dateTotalObj) => {
    //     var totalArr = []
    //     Object.entries(dateTotalObj).forEach(([key, obj]) => totalArr.push(dateTotalObj[key].total))
    //     return d3.extent(totalArr)
    // }

    createDateScale = (dateTotalObj) => {
        return d3.scaleTime()
            .domain(this.getDateDomainExtent(dateTotalObj))
            .range(this.getDateRangeExtent(dateTotalObj))
    }

    componentWillMount() {
        console.log(this.refs.container)
    }

    componentDidMount() {
        var dateTotalObj = this.createDateTotalObj(this.props.revenueQuery.allOrders)
        this.graphOne = d3.select(this.refs.graphOne)
        console.log(this.createDateScale(dateTotalObj))
    }

    render() {
        return ( 
            <Segment>
                <svg ref='graphOne' style={{width: '100%', height: '350px'}}></svg>
            </Segment>
        )
    }
}