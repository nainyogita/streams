var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    userpass: String
});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;

//GOOD EXAMPLE of User Schema

// var UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     lowercase: true,
//     unique: true,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['Client', 'Manager', 'Admin'],
//     default: 'Client'
//   }
// });


//PASSWORD ENCRYPTION

// Saves password as hashed code, require bcrypt
// UserSchema.pre('save', function (next) {
//   var user = this;
//   if (this.isModified('password') || this.isNew) {
//     bcrypt.genSalt(10, function (err, salt) {
//       if (err) {
//         return next(err);
//       }
//       bcrypt.hash(user.password, salt, function(err, hash) {
//         if (err) {
//           return next(err);
//         }
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     return next();
//   }
// });

//Decrypt the password so as to compare with the input password
// UserSchema.methods.comparePassword = function(pw, cb) {
//   bcrypt.compare(pw, this.password, function(err, isMatch) {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, isMatch);
//   });
// };
