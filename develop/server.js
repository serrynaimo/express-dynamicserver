var express = require('express'),
    app = exports.app = express();

app.get('/', function(req, res){
    res.send('Hello World!');
});

