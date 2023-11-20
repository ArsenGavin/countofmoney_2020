import React from 'react'
import { Icon, Panel } from 'rsuite'
import moment from 'moment'

////////// TEMPORAIRE
const crypto = {
    coinRank: "#1",
    price: "$5,561.81",
    symbol: "₿",
    symbolName: "BTC",
    marketCap: "$92,345,234.00",
    hourVolume: "$1,292,345,234.00",
    lastUpdated: "26.11.2020 8:20:45",
    change1hour: "0",
    change1day: "-3.08",
    change1week: "22.84",
}
////////// TEMPORAIRE

export const arrowDirection = (change) => {
    if (change > 0) {
        return <Icon icon='long-arrow-up'/>
    } else {
        if (change < 0) {
            return <Icon icon='long-arrow-down'/>
        } else {
            return <Icon icon='minus'/>
        }
    }
}

export const Details = (props) => {

    return (
        <div className="container" style={{verticalAlign: "middle", width: "100%"}}>
            <div style={{display : "flex", justifyContent : "space-around", marginBottom : "5vh"}}>
            <Panel className="DetailPanel" shaded bordered>
                <p>Lowest price</p>
                {arrowDirection(crypto.change1day)}
                <p>{props.details.lowestPrice}</p>
            </Panel>
            <Panel className="DetailPanel" shaded bordered>
                <p>Price</p>
                <Icon icon='money'/>
                <p>{props.details.currentPrice}</p>
            </Panel>
            <Panel className="DetailPanel" shaded bordered>
                <p>Symbol</p>
                <p>{props.details.symbol}</p>
            </Panel>
            </div>
            <div style={{display : "flex", justifyContent : "space-around"}}>
            <Panel className="DetailPanel" shaded bordered>
                <p>Highest price</p>
                {arrowDirection(crypto.change1week)}
                <p>{props.details.highestPrice}</p>
            </Panel>
            <Panel className="DetailPanel" shaded bordered>
                <p>Rank</p>
                <Icon icon='bar-chart'/>
                <p>{props.details.rank}</p>
            </Panel>
            <Panel className="DetailPanel" shaded bordered>
                <p>Last Updated</p>
                <Icon icon='refresh'/>
                <p>{moment(crypto.lastUpdated, "DD.MM.YYYY hh:mm:ss").fromNow()}</p>
            </Panel>
            </div>
            {/* <div style={{display : "flex", justifyContent : "space-around"}}>
            <Panel className="DetailPanel" shaded bordered>
                <p>Change (1 hour)</p>
                {arrowDirection(crypto.change1hour)}
                <p>%{crypto.change1hour}</p>
            </Panel>
            <Panel className="DetailPanel" shaded bordered>
                <p>Change (1 day)</p>
                {arrowDirection(crypto.change1day)}
                <p>%{crypto.change1day}</p>
            </Panel>
            <Panel className="DetailPanel" shaded bordered>
                <p>Change (1 week)</p>
                {arrowDirection(crypto.change1week)}
                <p>%{crypto.change1week}</p>
            </Panel>
            </div> */}

        </div>
    )
}
