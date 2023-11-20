export const fetchCryptos = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/cryptos/`, {
        method: 'GET',
        credentials: "include",
    }).then(res => {
        res.json().then(result => {
            return (result);
        })
            .catch(error => console.log(error));
    }).catch(err => console.log(err));
};
