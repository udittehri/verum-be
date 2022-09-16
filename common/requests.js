const axios = require("axios")

exports.post = (url, headers, data) =>
    new Promise((resolve, reject) => {
        const options = {
            url: url,
            method: 'POST',
            headers: headers,
            data: data
        }
        axios(options)
            .then(res => {
                resolve({ response: res })
            })
            .catch(error => {
                reject({ error })

            });
    })

exports.get = (url, headers) =>
    new Promise((resolve, reject) => {
        const options = {
            url: url,
            method: 'GET',
            // headers: headers,
        }
        axios(options)
            .then(res => {
                resolve({ response: res.data })
            })
            .catch(error => {
                reject({ error })

            });
    })

