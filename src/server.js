const express = require('express'),
    app = express();

const bodyParser = require('body-parser');
//use req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded());

//set view engine and dfefault views folder
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//serve static folder
app.use(express.static('../src'));

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
db.run('CREATE TABLE IF NOT EXISTS posts(post, username, id INTEGER PRIMARY KEY AUTOINCREMENT)');

require('./router')(app, db);
require('./delete')(app, db);
const server = app.listen(8000);

module.exports = db;

