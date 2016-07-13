'use strict';

var express = require('express');
var appRoot = require('app-root-path');
let app  = express();
let port = process.env.PORT || 3000;

app.use('/', express.static(appRoot + '/target'));

app.get('*', function(req, res) {
  res.sendFile(appRoot + '/target/index.html');
});

app.listen(port);
