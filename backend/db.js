const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/test"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;