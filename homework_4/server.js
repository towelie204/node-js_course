const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cheerio = require('cheerio');

const API = require('./habrApi');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// загружает новости и выдаёт ошибку! при обновлении страницы всё падает. не могу понять
app.get('/', async (req, res) => {
    let newsArr = [];
    
    if (!req.cookie || req.cookie === '' || 'news') {
        try {
            await API.getNews()
                .then(responce => {
                    const html = responce.data;
                    const $ = cheerio.load(html);
                    $('.post__title_link').each((i, element) => {
                        newsArr.push($(element).text());
                        // res.render('layout', { news: newsArr })
                    });
                })
        }
        catch {
            res.status('400');
        } 
        finally {
            res.render('layout', { 
                news: newsArr
            });
        }
    }
// list-snippet__title-link
    if (req.cookie === 'articles') {
        try {
            await API.getArticles()
                .then(responce => {
                    const html = responce.data;
                    const $ = cheerio.load(html);
                    $('.post__title_link').each((i, element) => {
                        newsArr.push($(element).text());
                        // res.render('layout', { news: newsArr })
                    });
                })
        }
        catch {
            res.status('400');
        } 
        finally {
            res.render('layout', { 
                news: newsArr
            });
        }
    }

    if (req.cookie === 'hubs') {
        try {
            await API.getArticles()
                .then(responce => {
                    const html = responce.data;
                    const $ = cheerio.load(html);
                    $('.list-snippet__title-link').each((i, element) => {
                        newsArr.push($(element).text());
                        // res.render('layout', { news: newsArr })
                    });
                })
        }
        catch {
            res.status('400');
        } 
        finally {
            res.render('layout', { 
                news: newsArr
            });
        }
    }
})

app.post('/', (req, res) => {
    // let source = req.body.source
    // console.log(source)
    // if (!req.cookies) {
    //     res.cookie('sourse', source, {
    //         maxAge: 1000 * 60,
    //         httpOnly: true,
    //     });
    // }
    res.cookie('source', req.body.source, {
        maxAge: 1000 * 60,
        httpOnly: true
    })
})

app.listen(3000);

console.log('server listening on port 3000...');