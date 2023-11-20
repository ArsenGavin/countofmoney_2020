import React, {useEffect, useState} from 'react'
import {List} from './DashboardComponents/ListComponent';
import {Graphs} from './DashboardComponents/GraphsComponent';
import {Details} from './DashboardComponents/DetailsComponent';
import {Articles} from './DashboardComponents/ArticlesComponent';
import { Input, InputGroup } from 'rsuite';

import {Panel, Loader} from 'rsuite';

import './DashboardStyle.css';
import {useSelector} from "react-redux";

export default function Dashboard() {
    const {isAuth} = useSelector(store => store.user);
    const [loadedCrypto, setLoaded] = useState(false);
    const [crypto, setCrypto] = useState();
    const [details, setDetails] = useState();
    const [cryptoName, setCryptoName] = useState();
    const [articles, setarticles] = useState();
    const [searchText, setSearchText] = useState("");

    const cleanArticlesArray = (array) => {
        let returnArray = [];
        array.forEach(value => {
            value.forEach(value2 => {
                returnArray.push(value2);
            })
        })
        return (returnArray);
    }

    const changeArticlesWithKeyWord = (keyword) => {
        let returnArticles = articles.filter(article => article.title.toLowerCase().includes(keyword.toLowerCase()));
        setarticles(returnArticles);
    }

    const fetchArticles = (values) => {
        fetch(`${process.env.REACT_APP_API_URL}/articles/`, {
            method: 'GET',
            credentials: "include",
        }).then(res => {
            res.json().then(result => {
                if (isAuth)
                    setarticles(cleanArticlesArray(result));
                else {
                    setarticles(cleanArticlesArray(result).filter((month,idx) => idx < values.article));
                }
            })
                .catch(error => console.log(error));
        }).catch(err => console.log(err));
    }

    const fetchCryptos = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cryptos/`, {
            method: 'GET',
            credentials: "include",
        }).then(res => {
            res.json().then(result => {
                setCrypto(result)
                setDetails(result[0])
                setCryptoName(result[0].idcrypto)
                setLoaded(true)
            })
                .catch(error => console.log(error));
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/admin/`, {
            method: 'GET',
            credentials: "include",
        }).then(res => {
            res.json().then(result => {
                fetchArticles(result);
            })
                .catch(error => console.log(error));
        }).catch(err => console.log(err));
        fetchCryptos();
    }, []);


    return (
        <div className="container">
            {!loadedCrypto ?
                <Loader size="lg" center backdrop style={{zIndex: "12"}}/>
                : <></>
            }
            <div className="componentsContainer" style={{display: "flex"}}>
                <Panel shaded style={{
                    flex: 2,
                    backgroundColor: "#1a1d24",
                    margin: "10px",
                    maxHeight: "calc(100vh - 80px)",
                    overflowY: "auto"
                }}>
                    {crypto &&
                    <List loader={(e) => setLoaded(e)} fetchCryptos={() => fetchCryptos()} changeCrypto={e => setCryptoName(e)} clickCrypto={(e) => setDetails(e)} list={crypto}/>}
                </Panel>
                <section style={{flex: 4, margin: "10px"}}>
                    <Panel shaded style={{
                        padding: "20px 20px",
                        backgroundColor: "#222233",
                        height: "calc(50vh - 50px)",
                        overflowY: "auto",
                        marginBottom: 20
                    }}>
                        {cryptoName && <Graphs cryptoName={cryptoName}/>}
                    </Panel>
                    <Panel shaded style={{
                        backgroundColor: "#222222",
                        height: "calc(50vh - 50px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflowY: "auto"
                    }}>
                        {details && <Details details={details}/>}
                    </Panel>
                </section>
                {isAuth && <section className="Container-article" style={{flex: 4, margin: "10px", maxWidth: '30%'}}>
                    <Panel shaded style={{
                        backgroundColor: "#222222",
                        height: "40px",
                        width: "60%",
                        margin: 'auto',
                        overflowY: "auto",
                        marginBottom: 20
                    }}>
                        <Input
                            value={searchText}
                            onChange={(value ,e) => {
                                setSearchText(value);
                                if (value.length > 0)
                                    changeArticlesWithKeyWord(value);
                                else
                                    fetchArticles();
                            }}
                            style={{height: 40, margin: 'auto', width: "100%"}}
                            placeholder="Search here"
                        />
                    </Panel>
                    <Panel shaded style={{
                        flex: 2,
                        padding: "20px",
                        backgroundColor: "#222244",
                        margin: "10px",
                        maxHeight: "calc(100vh - 140px)",
                        overflowY: "auto"
                    }}>
                        <Articles articles={articles}/>
                    </Panel>
                </section>}
                {!isAuth && <Panel shaded style={{
                    flex: 2,
                    padding: "20px",
                    backgroundColor: "#222244",
                    margin: "10px",
                    maxHeight: "calc(100vh - 80px)",
                    overflowY: "auto"
                }}>
                    <Articles articles={articles}/>
                </Panel>}
            </div>
        </div>
    )
}

// render(
//     <BrowserRouter>
//         <Dashboard />,
//         <ArticlesComponent />,
//         <Chart />,
//         <CryptoInfo />,
//         <ListCrypto />
//     </BrowserRouter>
// )
