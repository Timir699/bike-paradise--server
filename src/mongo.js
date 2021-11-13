const mongoose =  require('mongoose');

const HOST = process.env.MONGODB_HOST || "localhost";
console.log('process.env.MONGODB_HOST - ', HOST);

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.b2lyn.gcp.mongodb.net/bikeParadise?retryWrites=true&w=majority`
const options = {};


const log = (msg) => console.log(msg);

const connectWithDb = () => {
    mongoose.connect(uri, options, (err, db) => {
        if (err) {
            console.error(err);
        }

        else log("database connection established");
    });
};

module.exports = {uri, connectWithDb}
