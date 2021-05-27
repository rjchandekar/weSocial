const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000; 
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { pass } = require('./config/mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//set up static files
app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'weSocial',
    //TODO Change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`)
    }else{
        console.log('Listening on port :',port);
    }
})