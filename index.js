const express = require('express');
const port = 8000;
const app = express();

const homeHandler =function(req, res){
    res.send('Helllo from home');
}
app.get('/', homeHandler);

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`)
    }else{
        console.log('Listening on port :',port);
    }
})