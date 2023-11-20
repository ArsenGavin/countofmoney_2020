import React, {useEffect, useState} from 'react';
import {Button} from "rsuite";

export const AdminParamsComponent = (cryptoNumber) => {
    const [valueCrypto, setValueCrypto] = useState();
    const [valueArticles, setValueArticles] = useState();

    const fetchValues = () => {
        fetch(`${process.env.REACT_APP_API_URL}/admin/`, {
            method: 'GET',
            credentials: "include",
        }).then(res => {
            res.json().then(result => {
                console.log(result);
                setValueCrypto(result.crypto);
                setValueArticles(result.article);
            })
                .catch(error => console.log(error));
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        fetchValues();
    }, []);

    const submitChangement = () => {
        fetch(`${process.env.REACT_APP_API_URL}/admin/edit`, {
            method: 'PUT',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                article: valueArticles,
                crypto: valueCrypto
            })
        })
            .then(res => {
                fetchValues();
            })
            .catch((err) => {
                throw err;
            })
    }

    return (
        <div className="container-params" style={{minHeight: "300px"}}>
            <h3 style={{marginLeft: "10px"}}>Params</h3>
            <hr/>
            <p style={{marginLeft: "10px"}}>
                Crypto number display for non authenticated users :
                {valueCrypto && <input id="CountCrypto" value={valueCrypto} onChange={e => setValueCrypto(e.target.value)} name="CountCrypto" type="number" min="0" max={cryptoNumber} style={{backgroundColor: "gray", border: "none", marginLeft: "5px", width: "52px"}} />}
            </p>
            <p style={{marginLeft: "10px"}}>
                Articles number display for non authenticated users :
                {valueArticles && <input id="CountCrypto" name="CountCrypto" value={valueArticles} onChange={e => setValueArticles(e.target.value)} type="number" style={{backgroundColor: "gray", border: "none", marginLeft: "5px", width: "52px"}} />}
            </p>
            <Button onClick={() => submitChangement()} >Submit</Button>
        </div>
    )
}
