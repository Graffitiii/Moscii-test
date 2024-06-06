const mongoose = require("mongoose");

// const { MONGO_URI } = process.env;

const connection = mongoose.createConnection('mongodb+srv://saksornwattanasit:test@mosciitest.58ekttu.mongodb.net/mosciiDevice').on('open', () => {
    console.log("MongoDb Connected");
}).on('error', () => {
    console.log("MongoDb connectgion error");
});

module.exports = connection