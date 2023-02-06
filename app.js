const express = require('express');
const {client} = require('./connect');

const app = express();

app.listen(3000, 'localhost');

app.get('/', (req, res) => {
    res.sendFile('./views/no_query.html', { root: __dirname });
});

app.get('/hi', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

app.use((req,res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})