import React, {useEffect, useState} from 'react';
import {Table, Checkbox} from 'rsuite';
import {useSelector} from "react-redux";

const {Column, HeaderCell, Cell} = Table;


const HeaderSummary = ({title, summary}) => (
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

export const List = (props) => {

    const [crypto, setCrypto] = useState(props.list);
    const user = useSelector(store => store.user);
    const {isAuth} = useSelector(store => store.user);

    const orderArray = () => {
        let tmpCrypto = [];
        crypto.forEach(value => {
            if (user.favorites.includes(value._id)) {
                tmpCrypto.unshift(value);
            } else {
                tmpCrypto.push(value);
            }
        })
        setCrypto(tmpCrypto);
    }

    const changeState = (status, rowData, userConnect) => {

        props.loader(true);
        if (status) {
            user.favorites.push(rowData._id);
        } else {
            const index = user.favorites.indexOf(rowData._id);
            if (index > -1) {
                user.favorites.splice(index, 1);
            }
        }

        fetch(`${process.env.REACT_APP_API_URL}/manageUsers/${user._id}`, {
            method: 'PUT',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                favorite: user.favorites
            })
        })
            .then(res => {
                props.fetchCryptos();
                orderArray();
            })
            .catch((err) => {
                throw err;
            })
    }

    useEffect(() => {
        if (isAuth)
            orderArray();
    }, []);

    const cryptoNumber = crypto.length;
    return (
        <div>
            <div className="container">
                <Table headerHeight={80} style={{cursor: 'pointer'}} autoHeight={true} data={crypto}>
                    <Column width={130} align="left">
                        <HeaderCell>
                            <HeaderSummary title="Cryptocurrencies" summary={cryptoNumber}/>
                        </HeaderCell>
                        <Cell dataKey="name">
                            {rowData => {
                                function handleClick() {
                                    props.clickCrypto(rowData);
                                    props.changeCrypto(rowData.idcrypto);
                                }

                                return (
                                    <p className="crypto-click" onClick={handleClick}>{rowData.name}</p>
                                );
                            }}
                        </Cell>
                    </Column>
                    {isAuth && <Column width={80} align="center">
                        <HeaderCell>
                            <HeaderSummary title="Favorite" summary={user.favorites.length}/>
                        </HeaderCell>
                        <Cell dataKey="favorite"
                              style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            {rowData => {
                                return (
                                    <Checkbox
                                        checked={user.favorites.includes(rowData._id)}
                                        onChange={(value, checked, e) => {
                                            changeState(checked, rowData, false);
                                        }}
                                    />
                                )
                            }}
                        </Cell>
                    </Column>}
                </Table>
            </div>
        </div>

    )
}
