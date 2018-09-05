const express = require('express'),
     app = express();

const bodyParser = require('body-parser');
//use req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded());

//set view engine and dfefault views folder
app.set('view engine', 'pug');
app.set('views', __dirname + '/src/views');

//serve static folder
app.use(express.static('./public'));

const sqlite3 = require('sqlite3').verbose();
//create database object, connect to database
var db = new sqlite3.Database('./database.db', (err) => {
    if(err){
        return console.error(err.message);
    }else{
        console.log("Connected to database");
    }
});

db.run('CREATE TABLE IF NOT EXISTS users(username, id INTEGER PRIMARY KEY AUTOINCREMENT)');
db.run('CREATE TABLE IF NOT EXISTS posts(post, username, finished INTEGER, id INTEGER PRIMARY KEY AUTOINCREMENT)');

require('./src/router/login')(app, db);
require('./src/router/views')(app, db);
require('./src/router/update')(app, db);

const server = app.listen(8000);

module.exports = db;

