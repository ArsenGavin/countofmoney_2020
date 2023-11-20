import React, { useState, useEffect } from 'react';
import { Table, Button, Checkbox } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const AdminCryptoSummary = ({ title, summary }) => (
    <div>
        <label>{title}</label>
        <div
        style={{
            fontSize: 18,
            color: '#2eabdf'
        }}
        >
        {summary}
        </div>
    </div>
);

export const AdminCryptoComponent = (props) => {
    
    const height = window.screen.availHeight

    const [ crypto, setCrypto ] = useState(props.list);
    const [ page, setPage ] = useState(1);
    const [ displayLength, setDisplayLength ] = useState(10);

    const CrypoPagination = (changedPage, changedDisplayLength) => {
        let tmpArray = props.list.filter((v, i) => {
            const start = changedDisplayLength * (changedPage - 1);
            const end = start + changedDisplayLength;
            return i >= start && i < end;
          });

        setCrypto(tmpArray)
    }

    useEffect(() => {
        CrypoPagination(page, displayLength)
    }, [])

    const changeState = (status, rowData, userConnect) => {
        let newObject = [];
            crypto.forEach(line => {
                let tmpObj = {};
                if (line.name === rowData.name && !userConnect) {
                    tmpObj.all = status;
                    tmpObj.user = line.user;
                } else if (line.name === rowData.name && userConnect) {
                    tmpObj.user = status;
                    tmpObj.all = line.all;
                } else {
                    tmpObj.all = line.all;
                    tmpObj.user = line.user;
                }
                tmpObj.name = line.name;
                tmpObj.id = line.id;
                newObject.push(tmpObj);
            })
            setCrypto(newObject)
        }

    const cryptoNumber = props.list.length;
    return (
        <div className="container-list-crypto">
                <Table headerHeight={80} data={crypto} height={500}>
                    <Column width={200} align="left">
                        <HeaderCell>
                            <AdminCryptoSummary title="Cryptocurrencies" summary={cryptoNumber}/>
                        </HeaderCell>
                        <Cell dataKey="name">
                            {rowData => {
                                function handleClick() {
                                    props.clickCrypto(rowData);
                                }
                            return (
                                <p className="crypto-click" onClick={handleClick} >{rowData.name}</p>
                            );
                            }}
                        </Cell>
                    </Column>
                    <Column width={120}>
                        <HeaderCell>Add User</HeaderCell>
                        <Cell dataKey="user">
                            {rowData => {
                                return (
                                    < Checkbox
                                        checked={rowData.user}
                                        onChange={(value, checked, e) => {
                                            changeState(checked, rowData, true);
                                        }}
                                    /> 
                                )
                            } }
                        </Cell>
                    </Column>
                    <Column width={120}>
                        <HeaderCell>Add All</HeaderCell>
                        <Cell dataKey="all">
                            {rowData => {
                                return (
                                    < Checkbox
                                        checked={rowData.all}
                                        onChange={(value, checked, e) => {   
                                            changeState(checked, rowData, false);
                                        }
                                        }
                                    /> 
                                )
                            } }
                        </Cell>
                    </Column>
                </Table>
                <Table.Pagination
                    lengthMenu={[
                        {
                        value: 10,
                        label: 10
                        },
                        {
                        value: 20,
                        label: 20
                        }
                    ]}
                    activePage={page}
                    displayLength={displayLength}
                    total={props.list.length}

                    onChangePage={(changedPage) => {
                        setPage(changedPage)
                        CrypoPagination(changedPage, displayLength)
                    }}
                    onChangeLength={(length) => {
                        setPage(1)
                        setDisplayLength(length)
                        CrypoPagination(1, length)
                    }}
                    style={{color: "white", backgroundColor : "#1a1d24"}}
                />
        </div>
    )
}
