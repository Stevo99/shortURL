var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
var axios = require('axios');

var config = require('./config');
var setupController = require('./controllers/setupController');

var app = express();

var port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/css')));
app.use(express.static(path.join(__dirname + '/js')));

mongoose.connect(config.getDbConnectionString(), {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

setupController(app);

app.listen(port, function(err) {
    if (err) console.log(err);
    console.log('The server is running on port: ' + port);
});
