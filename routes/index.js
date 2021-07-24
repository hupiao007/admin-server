var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const UserModel = require('../db/models').UserModel
const filter = {password:0}  //filter the password out during finding

/* login router */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//test with postman
// router.post('/register', function (req, res) { 
//   const {username, password} = req.body 
//   console.log('register', username, password)
// if (username === 'admin') {
//   res.send({code: 1, msg: '此用户已存在'}) 
// } else {
//   res.send({code: 0, data: {_id: 'abc', username, password}}) }
// })



// /*register router */
router.post('/register', function (req,res){
  //read the request
  const {username, email, password} = req.body
  //handle
    //determine if the user exits already or not
    //If the user exits, return error. IF not, save the user
  UserModel.findOne({username}, function(err, user) {
    if (user) {
      res.send({code: 1, msg: "Username has been taken."})
    } else {
      new UserModel({username, email, password: md5(password)}).save(function (err, user) {
        //use cookie() to keep login for a week
        res.cookie('userid', user._id, {maxAge: 1000 * 60*60*24*7})

        //don't iniclue password in the response data
        const data = {_id:user.id, username, email}
        res.send({code: 0, data: data})
      });
    }
  })
})

router.post('/login', function(req, res) {
  const {username, password} = req.body
  //find the user in the database
  UserModel.findOne({username, password: md5(password)}, filter, function(err, user){
    if (user) {  //login success
      res.cookie('userid', user._id, {maxAge: 1000 * 60*60*24*7})
      res.send({code:0, data:user})
    } else {    //login fail
      console.log({code:0, msg:"Incorrect username or password"});
    }
  })
})

module.exports = router;
