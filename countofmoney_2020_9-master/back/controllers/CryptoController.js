const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const router = new express.Router();
const Crypto = require("../models/crypto");
const Favorites = require("../models/Favorites");
const { checkAuthAdmin } = require('../config/middleware');
dotenv.config();

const getListOfCrypto = () => {
    return axios.get(`${process.env.CRYPTO_URL}/coins/list`)
        .then(function (response) {
            return response;
        })
        .catch(function (err) {
            return err;
        });
}

const getCryptoInfo = (idcrypto) => {
    return axios.get(`${process.env.CRYPTO_URL}/coins/${idcrypto}`)
        .then(function (response) {
            return response;
        })
        .catch(function (err) {
            return err;
        });
}

const getValueCrypto = (idcrypto, currency) => {
    return axios.get(`${process.env.CRYPTO_URL}/simple/price?ids=${idcrypto}&vs_currencies=${currency}`)
        .then(function (response) {
            return response;
        })
        .catch(function (err) {
            return err;
        });
}

const getIntervalPrice = (crypto, currency) => {
    dates = new Date();
    datenow = Date.now();
    date = new Date(dates.getFullYear(), dates.getMonth(), dates.getDate());
    date = date / 1000;
    datenow = datenow / 1000;
    return axios.get(`${process.env.CRYPTO_URL}/coins/${crypto}/market_chart/range?vs_currency=${currency}&from=${date}&to=${datenow}`)
        .then(function (response) {
            var tmp = response.data.prices;
            var max = 0;
            var min = 0;

            tmp.forEach(element => {
                if (min == 0)
                    min = element[1];
                if (max < element[1]) {
                    max = element[1];
                }
                if (min > element[1]) {
                    min = element[1];
                }
            });
            return { 'min': min, 'max': max };
        })
        .catch(function (err) {
            return err;
        })
}

const getCryptoData = (crypto, curren) => {
    let promises = [];
    crypto.map(async function (el) {
        promises.push(getValueCrypto(el.idcrypto, curren).then(res1 => {
            if (res1.data && res1.data[el.idcrypto]) {
                el.currentPrice = res1.data[el.idcrypto][curren];
                el.currency = curren;
            }
        }).catch((err) => {
            return err;
        }));
        promises.push(getCryptoInfo(el.idcrypto).then(res2 => {
            if (res2.data) {
                el.symbol = res2.data.symbol;
                el.rank = res2.data.market_cap_rank;
            }
        }));
        promises.push(getIntervalPrice(el.idcrypto, curren).then(res3 => {
            if (res3.min) {
                el.lowestPrice = res3.min.toFixed(2);
                el.highestPrice = res3.max.toFixed(2);
            }

            return (el);
        }))
    })

    return Promise.all(promises).then(res => {
        return res;
    });
}

const getDailyValue = (idcrypto, currency) => {

    return axios.get(`${process.env.CRYPTO_URL}/coins/${idcrypto}/market_chart?vs_currency=${currency}&days=60&interval=daily`)
        .then((response) => {
            return (response.data.prices);
        });
}

const getHourlyValue = (idcrypto, currency) => {
    return axios.get(`${process.env.CRYPTO_URL}/coins/${idcrypto}/market_chart?vs_currency=${currency}&days=2`)
        .then((response) => {
            return (response.data.prices);
        });
}

const getMinuteValue = (idcrypto, currency) => {
    return axios.get(`${process.env.CRYPTO_URL}/coins/${idcrypto}/market_chart?vs_currency=${currency}&days=1`)
        .then((response) => {
            let values = response.data.prices;
            let array = values.filter((value, idx) => idx < 120);
            return array;
        });
}

router.get('/', async (req, res) => {
    var currency = "usd";
    if (req.user != undefined)
        currency = req.user.currency;
    Crypto.find({}, function (err, cryptos) {
        getCryptoData(cryptos, currency).then(ress => {
            let filtered = ress.filter(function (el) {
                return el != null;
            });
            return res.status(200).send(filtered);
        })
    }).lean();
});

const foundCryptoId = (cryptos, id) => {
    let found = false;
    for(let i = 0; i < cryptos.length; i++) {
        if (cryptos[i]._id === id) {
            found = i;
            break;
        }
    }
    return (found);
}

router.get('/ifConnected/:id', async (req, res) => {
    let currency = "usd";
    if (req.user !== undefined)
        currency = req.user.currency;
    Crypto.find({}, function (err, cryptos) {
        Favorites.find({User: req.params.id}).then(result => {
            result.forEach(value => {
                if (foundCryptoId(cryptos, value.Crypto) > 0) {
                    cryptos[foundCryptoId(cryptos, result.Crypto)].favorite = true;
                }
            })
        });
        getCryptoData(cryptos, currency).then(ress => {
            let filtered = ress.filter(function (el) {
                return el != null;
            });
            return res.status(200).send(filtered);
        })
    }).lean();
});

router.get(`/:id`, async (req, res) => {
    const idcrypto = req.params.id;
    var currency = "usd";
    if (req.user != undefined)
        currency = req.user.currency;

    Crypto.find({ idcrypto: { $regex: "^" + idcrypto, $options: "" } }, async function (err, foundCrypto) {
        if (err) {
            return res.status(500).send({ message: "Internal Server Error" });
        } else if (foundCrypto) {
            getCryptoData(foundCrypto, currency).then(ress => {
                return res.status(200).send(ress);
            })
        }
    }).lean();
});

router.get(`/:id/history/:period`, (req, res) => {
    const idcrypto = req.params.id;
    const period = req.params.period;
    var currency = "usd";
    if (req.user != undefined)
        currency = req.user.currency;
    Crypto.find({ idcrypto: idcrypto }, async function (err, foundCrypto) {
        if (err) {
            return res.status(500).send({ message: "Internal Server Error." });
        }
        else if (!foundCrypto) {
            return res.status(404).send({ message: "No crypto found." });
        }
        else {
            switch (period) {
                case 'daily':
                    getDailyValue(idcrypto, currency)
                        .then((response) => {
                            return res.status(200).send(response);
                        });
                    break;
                case 'hourly':
                    getHourlyValue(idcrypto, currency)
                        .then((response) => {
                            return res.status(200).send(response);
                        })
                    break;
                case 'minute':
                    getMinuteValue(idcrypto, currency)
                        .then((response) => {
                            return res.status(200).send(response);
                        });
                    break;
                default:
                    return res.status(401).send({ message: 'You need to specify the period needed. please retry' });
                    break;
            }
        }
    })
});

router.post('/', checkAuthAdmin, (req, res) => {
    const name = req.body.name;
    const idcrypto = req.body.idcrypto;
    Crypto.findOne({ idcrypto: idcrypto }, function (err, foundCrypto) {
        if (err) {
            return res.status(500).send({ message: "Internal Server Error" });
        } else if (foundCrypto) {
            return res.status(409).send({ message: "Crypto Already added" });
        } else {
            Crypto.create([{
                name,
                idcrypto
            }], function (err) {
                if (err) {
                    res.status(500).send({ message: "Internal Server Error" });
                }
                res.status(201).send({ message: "Crypto added with success" });
            });
        }
    });
});

router.get('/value/allcryptos', checkAuthAdmin, async (req, res) => {
    const { data: result } = await getListOfCrypto();
    if (req.isAuthenticated()) {
        res.status(200).send(result);
    } else
        return res.status(500).send({ message: "You are not logged in." });
});

router.delete(`/:id`, checkAuthAdmin, async (req, res) => {
    const idcrypto = req.params.id;
    Crypto.findOneAndDelete({ idcrypto: idcrypto }, function (err, foundCrypto) {
        if (err) {
            return res.status(500).send({ message: "Internal Server Error" });
        } else if (foundCrypto) {
            return res.status(200).send({ message: "delete crypto" });
        }
        return res.status(404).send({ messagee: "This crypto doesn't exist." });
    })
})

module.exports = router;
