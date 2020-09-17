const mongoose               = require('mongoose'),
      passportLocalMongoose  = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: { 
        type: String 
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);