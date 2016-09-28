var express = require('express');
var passport = require('passport');
var router = express.Router();

/* Render chat view */
router.get('/dashboard', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
});


module.exports = router;
