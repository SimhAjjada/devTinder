const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 50
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    gender : {
        type : String,
        validate(value) {
            if(!["male","female","others"].includes(value)) {
                throw new Error("Gender data is not valid!");
            }
        }
    },
    photoUrl : {
        type : String,
        
    },
    about : {
        type : String,
        default : "This is default about of the user"
    },
    skills : {
        type : [String],
    }
},{
    timestamps : true
});

module.exports = mongoose.model("User",userSchema);