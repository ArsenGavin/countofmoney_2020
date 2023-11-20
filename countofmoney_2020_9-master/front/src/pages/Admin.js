import React, {useEffect, useState} from 'react'
import { AdminCryptoComponent } from './AdminComponents/AdminCryptoComponent';
import { AdminArticlesComponent } from './AdminComponents/AdminArticlesComponent';
import { AdminParamsComponent } from './AdminComponents/AdminParamsComponent';

import { Panel, Loader } from 'rsuite';
import './AdminStyle.css';

export default function Admin() {

    var [ loadedCrypto, setLoaded ] = useState(false);
    const [ crypto, setCrypto ] = useState();
    const [ details, setDetails ] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/cryptos/value/allcryptos`, {
            method: 'GET',
            credentials: "include",
        }).then(res => {
            res.json().then(result => {
                setCrypto(result)
                setDetails(result[0])
                setLoaded(true)
            })
                .catch(error => console.log(error));
        }).catch(err => console.log(err));
    }, []);


    return (
        <div className="adminComponent">
            {!loadedCrypto ?
                <Loader size="lg" center backdrop style={{zIndex : "12"}}/>
                : <></>
            }
            <Panel>
                {crypto && <AdminCryptoComponent clickCrypto={(e) => setDetails(e)} list={crypto} />}
            </Panel>
            <AdminArticlesComponent />
            <AdminParamsComponent />
        </div>
    )
}
