const express = require('express');
const port = 8000;
const app = express();

app.use('/', require('./routes'));



app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`)
    }else{
        console.log('Listening on port :',port);
    }
})