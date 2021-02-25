const express = require('express');
var cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.use(express.urlencoded({extended: true}));

const router = require('./routes/index.routes');


module.exports = app;