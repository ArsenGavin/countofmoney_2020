const mongoose = require('mongoose');
const Administration = require('./Administration');
const User = require('./user');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_BDD } = process.env;

mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_BDD}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});

module.exports = { Administration, User };