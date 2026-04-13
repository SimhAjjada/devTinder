const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");   


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
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }
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

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id: user._id}, "Dev@Tinder$6554", {
                expiresIn: "7d"
             });
    
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );

    return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema);