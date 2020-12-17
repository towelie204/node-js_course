const axios = require('axios');
const cheerio = require('cheerio');

const instance = axios.create({
    baseURL: 'https://habr.com/ru/'
});

// instance.get('news/')
//     .then((responce) => {
//         const html = responce.data;

//         const $ = cheerio.load(html);
//         $('.post__title_link').each((i, element) => {
//             console.log($(element).text());
//         });
//     })
//     .catch((err) => {
//         console.error(err);
//     })

const API = {
    getNews() {
        return instance.get('news/')
    },
    getArticles() {
        return instance.get('top/')
    },
    getHubs() {
        return instance.get('hubs/')
    }
}

module.exports = API;