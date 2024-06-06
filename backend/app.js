const express = require('express');
const body_parser = require('body-parser');
const DeviceRouter = require('./routers/device.router');
const app = express();
var cors = require('cors')


app.use(cors());
app.use(body_parser.json());

app.use('/',DeviceRouter);


module.exports = app;