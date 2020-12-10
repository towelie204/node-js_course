const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const API = require('./API');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

let translatedText;

app.get('/', (req, res) => {
    res.render('layout', {
        translated: translatedText
    })
})

app.post('/', urlencodedParser, async (req, res) => {
    let text = req.body.text;

    await API.translate(text)
        .then(response => {
            translatedText = response.data.translations[0].text;
            res.redirect('/');
            return translatedText;
        })
        .catch(err => {
            console.error(err);
        })
});

app.listen(3000);

console.log('server listening on port 3000...');