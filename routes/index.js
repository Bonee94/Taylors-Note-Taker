const express = require('express');
const path = require('path');

const app = express();

const notes = require('./notes');

app.use('/notes', notes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})


module.exports = app;