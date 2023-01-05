const express = require('express');
const path = require('path');

const app = express();

const notes = require('./notes');
const api = require('../db/index');

app.use('/notes', notes);
app.use ('/api/notes', api);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = app;