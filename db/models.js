/*
Includes several Models that can operate on the collection database
*/

//connect to db
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/sushi-lovers', 
{useNewUrlParser: true, useUnifiedTopology: true})

const conn = mongoose.connection
conn.on('connected', () => {
    console.log('db connected successfully.');
})

//define collections Model and expose it
//define Schema (structure of document)
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    info: {type: String}, 
    company: {type: String},
    salary: {type: String}
})
//define Model (collection)
const UserModel = mongoose.model('user', userSchema)
//expose Model
// module.exports = xxx        //can only be exposed once
// exports.xxx = value         //expose seperately, can be exposed times
exports.UserModel = UserModel