require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
require('./config/passport')(passport);

const db = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(db, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true 
    })
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

const app = express();

//express sessions
app.use(session({
    secret: 'all-cats-are-beatiful',
    store: new FileStore(),
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 3600000,
    },
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method')); //библиотека для использования методов PUT, DELETE

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/notes', indexRouter);
app.use('/', authRouter);

app.listen(3000);
console.log('server listening on port 3000...');