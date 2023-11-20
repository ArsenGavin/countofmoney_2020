import React, {useEffect, useState} from 'react'
import Chart from "react-apexcharts";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

////////// TEMPORAIRE
const crypto = {
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    time: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
}
////////// TEMPORAIRE

const options = {
    chart: {
        background: '#222233'
    },
    series: [{
        name: 'price ($)',
        data: crypto.data
    }],
    xaxis: {
        categories: crypto.time
    },
    theme: {
        mode: 'dark',
    }
}

const ChartComponent = (props) => {
    const options = {
        chart: {
            background: '#222233'
        },
        series: [{
            name: 'price ($)',
            data: props.options.data
        }],
        xaxis: {
            tickAmount: 10,
            categories: props.options.time,
            labels: {
                formatter: function (value) {
                    const date = new Date(value);
                    let returnDate = "";
                    returnDate = returnDate + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
                    return (returnDate);
                }
            }
        },
        theme: {
            mode: 'dark',
        }
    }

    return (
        <Chart
            options={options}
            series={options.series}
            type="area"
            width="100%"
            height="285"
        />
    );
}

export const Graphs = (props) => {
    const [optionsDaily, setOptionsDaily] = useState();
    const [optionsHourly, setOptionsHourly] = useState();
    const [optionsMinute, setOptionsMinute] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/cryptos/${props.cryptoName}/history/minute`, {
            method: 'GET',
            credentials: "include",
        }).then(res => {
            res.json().then(result => {
                setOptionsMinute(parseData(result));
            })
                .catch(error => console.log(error));
        }).catch(err => console.log(err));

        fetch(`${process.env.REACT_APP_API_URL}/cryptos/${props.cryptoName}/history/hourly`, {
            method: 'GET',
            credentials: "include",
        }).then(res => {
            res.json().then(result => {
                setOptionsHourly(parseData(result));
            })
                .catch(error => console.log(error));
        }).catch(err => console.log(err));

        fetch(`${process.env.REACT_APP_API_URL}/cryptos/${props.cryptoName}/history/daily`, {
            method: 'GET',
            credentials: "include",
        }).then(res => {
            res.json().then(result => {
                setOptionsDaily(parseData(result));
            })
                .catch(error => console.log(error));
        }).catch(err => console.log(err));
    }, [props.cryptoName]);

    const parseData = (data) => {
        let returnData = {
            data: [],
            time: []
        };
        data.forEach(value => {
            returnData.data.push(parseFloat(value[1]).toFixed(2));
            returnData.time.push(value[0]);
        })
        return (returnData);
    };

    return (
        <div>
            {optionsDaily && optionsHourly && optionsMinute && <Tabs>
                <TabList>
                    <Tab>Minutes</Tab>
                    <Tab>Hourly</Tab>
                    <Tab>Daily</Tab>
                </TabList>

                <TabPanel>
                    {optionsMinute && <ChartComponent options={optionsMinute} />}
                </TabPanel>
                <TabPanel>
                    {optionsHourly && <ChartComponent options={optionsHourly} />}
                </TabPanel>
                <TabPanel>
                    {optionsDaily && <ChartComponent options={optionsDaily} />}
                </TabPanel>
            </Tabs>}

        </div>
    )
}
