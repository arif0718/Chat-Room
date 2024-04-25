const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String ,Number
    },
    conformpassword : {
        type : String,Number
    }
});

const SignupRegister = new mongoose.model("Signupregister", signupSchema);

module.exports = SignupRegister;