/**
* Module dependencies.
*/
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
if (process.env.JAWSDB_URL) { 
  connection = mysql.createConnection(process.env.JAWSDB_URL); 
} else { 
  connection = mysql.createConnection({ 
    port: 3306, 
    host: "localhost", 
    user: "root", 
    password: "none", 
    database: "user_auth_blog" 
  }); 
}
var PORT = process.env.PORT || 8080;
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
 
// development only
 
app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login

//Middleware

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

