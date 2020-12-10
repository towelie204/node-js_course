const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://translate.api.cloud.yandex.net/translate/v2/translate',
    headers: {
        'Content-Type': 'aaplication/json',
        'Authorization': 'Bearer ' + process.env.IAM_TOKEN
    }
});

const API = {
    translate(text) {
        return (instance.post('', {
            "folder_id": process.env.FOLDER_ID,
            "texts": text,
            "targetLanguageCode": "ru"
        }))
    }
}

module.exports = API;