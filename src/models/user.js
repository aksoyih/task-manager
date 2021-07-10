const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('Email is invalid')
        },
        trim: true,
        lowercase: true,
        unique: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0) throw new Error('Age must be a positive number')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(validator.contains(value.toLowerCase(), 'password')) throw new Error('Password cannot contain the word "password"')
        }
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to log in')
    }

    return user
}

//hash the plain text password
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User