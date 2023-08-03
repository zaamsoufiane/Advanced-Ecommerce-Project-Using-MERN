const mongoose = require('mongoose')
const { v1 : uuidv1 } = require('uuid');
const crypto = require('crypto')
const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
        maxlength: 50,
        trim: true
    },
    email: {
        type:String,
        required: true,
        maxlength: 50,
        trim: true,
        unique: true
    },
    hashed_password: {
        type:String,
        required: true
    },
    salt: {
        type:String,

    },
    about:{
        type:String
    },
    role:{
        type:Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }



},{
    timestamps: true
})

userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.cryptPassword(password)
})
.get(function() {
    return this._password
})

userSchema.methods = {
    cryptPassword : function(password){
        if(!password){
            return ''
        }
        try {
            return crypto
                   .createHmac('sha1', this.salt)
                   .update(password)
                   .digest('hex')
        } catch (error) {
            return ''
        }
    },

    authenticate: function(pass){
        return this.cryptPassword(pass) === this.hashed_password
    }
}

module.exports = mongoose.model('User', userSchema)
