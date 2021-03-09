const express = require('express');
const app = express();

var cors = require('cors');
const router = require('./routes/index.routes');

app.use(express.json());
app.use(cors());
app.use('/api', router);



app.use(express.urlencoded({extended: true}));



module.exports = app;