/*
Use mongoose to CURD mongodb
*/
//a hashing function to encrypt password
const md5 = require ('blueimp-md5')
const mongoose = require ('mongoose')
mongoose.connect('mongodb://localhost:27017/sushi-lovers', 
{useNewUrlParser: true, useUnifiedTopology: true})

//get connected object
const conn = mongoose.connection
//monitor connection status
conn.on('connected', function () {
    console.log("Connection success.");
})

//define Schema (describe the structure of document)
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    //email: {type: String, required: true},
})

//define Model (relate to document, and can work on collection)
//A function to build document obejct: user
const UserModel = mongoose.model('user', userSchema)

//CRUD
function testSave() {
    //create an instance of userModel
    const userModel = new UserModel({username: "aa", password: md5("bb")})
    //save to the database
    userModel.save(function (error, userDoc) {
        console.log('save()', error, userDoc)
    })
}
testSave()

function testFind() {
    UserModel.find(function (error, users) {   //find all matched user
        //return [user1, user2, ...] or [] if nothing mathced
        console.log('find()', error, user);
    })
    
    UserModel.findOne({username: 'aa', function (eeor, user){   //find the first matched
        //return the mathced document object. If nothing mathced, return null
        console.log('findOne()', error, user);
    }})
}

function testUpdate() {
    UserModel.findByIdAndUpdate({_id:'2222'}, {username:'Jack'},  
    //id as the first arg, update value as the second arg
    function (error, oldUser) {
        //return the oldUser before update
        console.log('findByIdAndUpdate()', error, oldUser);
    })
}

function testDelete() {
    UserModel.remove({_id:'3333'}, function (error, result){
        //delete the mathced documents/users
        console.log('remove()', err, result);
        //result example: {n: 1, ok: 1}
        // n: the number of deleted documents/users
        // ok: 1: deleted successfully
    })
}