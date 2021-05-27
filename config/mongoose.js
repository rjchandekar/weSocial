const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/social_development', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
 });

const db = mongoose.connection;

db.on('error', console.error.bind('Error conneting to MongoDB'));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
})

module.exports = db;