var express = require('express');
var userModel = require('../models/user');
var passport = require('passport');
var config = require('../config/mainconfig');
var jwt = require('jsonwebtoken');
//app.use(passport.initialize());
var app = express();
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("inside login get");
    res.render('login');
});

router.post('/', function(req, res, next) {
    //console.log("inside login post");
    //console.log("login post---" + req.body.username);

    userModel.find({
        username: req.body.username
    }, function(err, user) {
        if (err)
            console.log('error finding');

        console.log("login.js-->" + user);

        if (user.length != 0) {
            console.log(config.secret);

            var token = jwt.sign({
                user: user
            }, config.secret, {
                expiresIn: '10m'
                    // in seconds
            });

            res.json({
                success: true,
                token: 'JWT ' + token
            });

            console.log(token);
            //  res.redirect('chat/?username=' + req.body.username);
        } else {
            console.log("user donot exist");
            res.redirect('register');
            //  res.send({success:false,message:'user donot exist'});
        }
    });
});

module.exports = router;
