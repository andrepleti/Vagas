'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//Conecta ao banco
mongoose.connect(config.connectionString, { useNewUrlParser: true, useFindAndModify: false});

//Carrega os Models
const Post = require('./models/Post');
const Category = require('./models/Category');

//Carrega as Rotas
const indexRoute = require('./routes/index-route');
const postRoute = require('./routes/post-route');
const categoryRoute = require('./routes/category-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
     extended: false 
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/post', postRoute);
app.use('/category', categoryRoute);

module.exports = app;