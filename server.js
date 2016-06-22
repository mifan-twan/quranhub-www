"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const context = require('./context');

const app = express();

app.use(cors());
app.use(compression());

app.use('/build', express.static(__dirname + "/build"));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    context: context,
}));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.use('*', (req, res) => {
    res.redirect('/')
})


const server = app.listen(process.env.PORT || 9000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('server is running')
    }
});
