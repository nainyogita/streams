var express = require('express');
var userModel = require('../models/user');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("inside register get");
    res.render('register', {
        // title: 'Register user'
    });
});

router.post('/', function(req, res, next) {
    console.log("inside register post");
    if (!req.body.name || !req.body.password) {
        res.json({
            success: false,
            message: 'Please enter email and password'
        });
    } else {
        userModel.find({
            username: req.body.name
        }, function(err, user) {
            if (err)
                console.log('error finding');

            //console.log(user);
            if (user.length == 0) {
                var newUser = new userModel({
                    username: req.body.name,
                    userpass: req.body.password
                });

                newUser.save(function(err) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: "Error saving user"
                        })
                    };
                    console.log('User saved successfully');
                    //res.send('Saved successfully');
                    res.render('chat', {
                        title: 'Chat web app'
                    });
                    //res.json({success:true,message:"Successfully creates new user"});
                });
            } else {
                console.log("user already exist");
                res.render('register', {
                    title: 'Register user'
                });

            }
        });

    }
});

module.exports = router;
