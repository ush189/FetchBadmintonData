var express = require('express');
var request = require('request');

var app = express();
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/badminton', function (req, res) {
    request('https://spreadsheets.google.com/feeds/cells/1Lc1dkMuCVaer0rTqjh5ix-XJXlAEguOmnckNx41kZbo/1/public/values?alt=json', function(error, response, body) {
        if (error) {
            console.log('body:', body);
            console.log('error:', error);
            res.send({});
        } else {
            try {
                res.send(JSON.parse(body));
            } catch (e) {
                console.log('body:', body);
                console.log('error:', e.message);
                res.send({});
            }
        }
    });
});

app.listen(port, function () {
    console.log('Server listening at port %s', port);
});