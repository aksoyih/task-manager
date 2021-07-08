const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const User = mongoose.model('User',{
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
        lowercase: true
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
        validate(value){
            if(value.length <= 6){
                throw new Error('Password must contain at least characters')
            } 
            if(validator.contains(value.toLowerCase(), 'password')) throw new Error('Password cannot contain the word "password"')
        }
    }
})

const me = new User({
    name: 'Haluk',
    email: 'haluk@ihaksoy.com',
    password: 'helloworld'
})

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })

const Task = mongoose.model('Task',{
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// const task = new Task({
//     description: 'First task!'
// }).save().then((task) => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })