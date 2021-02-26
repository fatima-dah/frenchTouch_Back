const express = require('express');
var cors = require('cors')
const app = express();
const router = require('./routes/index.routes');

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.use(express.urlencoded({extended: true}));



module.exports = app;